// Local persistence, settings, import / export. Depends on i18n.js and stats.js.

// The "conso-carbu:" prefix comes from the app's former name. It must not
// change: renaming the keys would lose the users' data.
const STORAGE_KEYS = {
  fills: 'conso-carbu:fills',
  expenses: 'conso-carbu:expenses',
  vehicles: 'conso-carbu:vehicles',
  settings: 'conso-carbu:settings',
};

// Keys of the former Google Drive backup (access token included), deleted on load.
const OBSOLETE_KEYS = ['conso-carbu:drive-token', 'conso-carbu:drive-last', 'conso-carbu:drive-hash'];

// Allowed values of each setting. Data is always stored in km, litres and the
// chosen currency: only input and display are converted.
const THEMES = ['auto', 'light', 'dark'];
const ACCENTS = ['teal', 'blue', 'violet', 'rose', 'orange', 'green'];
const TEXT_SIZES = ['small', 'normal', 'large'];
const DENSITIES = ['normal', 'compact'];
const CONSO_UNITS = ['l100', 'kml', 'mpg-uk', 'mpg-us'];
const DISTANCE_UNITS = ['km', 'mi'];
const VOLUME_UNITS = ['L', 'gal'];
const CURRENCIES = ['EUR', 'CHF', 'GBP', 'USD', 'CAD'];
const START_TABS = ['add', 'history', 'expenses', 'stats', 'sim'];
const OPTIONAL_TABS = ['expenses', 'sim'];

const DEFAULT_SETTINGS = {
  language: 'en', country: 'OTHER',
  theme: 'auto', e85Ethanol: 75, activeVehicleId: null,
  accent: 'teal', textSize: 'normal', density: 'normal',
  consoUnit: 'l100', distanceUnit: 'km', volumeUnit: 'L', currency: 'EUR', priceDecimals: 3,
  startTab: 'add', hiddenTabs: [], defaultFull: true,
};

// Resets missing or invalid settings to their default value.
function cleanSettings(s) {
  const pick = (key, allowed) => { if (!allowed.includes(s[key])) s[key] = DEFAULT_SETTINGS[key]; };
  pick('language', Object.keys(LANGUAGES));
  pick('country', Object.keys(COUNTRIES));
  pick('theme', THEMES);
  pick('accent', ACCENTS);
  pick('textSize', TEXT_SIZES);
  pick('density', DENSITIES);
  pick('consoUnit', CONSO_UNITS);
  pick('distanceUnit', DISTANCE_UNITS);
  pick('volumeUnit', VOLUME_UNITS);
  pick('currency', CURRENCIES);
  pick('startTab', START_TABS);
  if (!(s.e85Ethanol >= 65 && s.e85Ethanol <= 85)) s.e85Ethanol = 75;
  if (s.priceDecimals !== 2 && s.priceDecimals !== 3) s.priceDecimals = 3;
  if (typeof s.defaultFull !== 'boolean') s.defaultFull = true;
  s.hiddenTabs = Array.isArray(s.hiddenTabs) ? OPTIONAL_TABS.filter(tab => s.hiddenTabs.includes(tab)) : [];
  if (s.hiddenTabs.includes(s.startTab)) s.startTab = 'add';
  return s;
}

const isDate = d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
// IDs are inserted into the HTML (data-id, value): only safe characters are
// accepted, even from a hand-edited backup.
const isId = id => typeof id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(id);
const makeId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const isKey = (table, key) => typeof key === 'string' && Object.hasOwn(table, key);

// vehicleId is optional here: data from before multi-vehicle support has none
// and is attached on load.
function isValidFill(f) {
  return f && typeof f === 'object'
    && isId(f.id)
    && (f.vehicleId == null || isId(f.vehicleId))
    && isDate(f.date)
    && Number.isFinite(f.distance) && f.distance >= 0
    && (f.odometer == null || (Number.isFinite(f.odometer) && f.odometer >= 0))
    && typeof f.full === 'boolean'
    && Array.isArray(f.parts) && f.parts.length > 0
    && f.parts.every(p => p && isKey(FUELS, p.fuel)
      && Number.isFinite(p.litres) && p.litres > 0
      && Number.isFinite(p.total) && p.total >= 0)
    && partsCompatible(f.parts);
}

function isValidExpense(e) {
  return e && typeof e === 'object'
    && isId(e.id)
    && (e.vehicleId == null || isId(e.vehicleId))
    && isDate(e.date)
    && isKey(EXPENSE_CATEGORIES, e.category)
    && Number.isFinite(e.amount) && e.amount >= 0
    && (e.note == null || (typeof e.note === 'string' && e.note.length <= 200))
    && (e.recurrence == null || isKey(RECURRENCES, e.recurrence))
    && (e.endDate == null || (isDate(e.endDate) && e.endDate >= e.date));
}

function isValidVehicle(v) {
  return v && typeof v === 'object'
    && isId(v.id)
    && typeof v.name === 'string' && v.name.trim().length > 0 && v.name.length <= 40
    && isKey(FAMILIES, v.family)
    && (v.tank == null || (Number.isFinite(v.tank) && v.tank > 0))
    && (v.defaultFuel == null || isKey(FUELS, v.defaultFuel))
    && Array.isArray(v.hiddenFuels) && v.hiddenFuels.every(k => isKey(FUELS, k))
    // Fuels from other countries added by hand (optional, newer field).
    && (v.extraFuels == null || (Array.isArray(v.extraFuels) && v.extraFuels.every(k => isKey(FUELS, k))));
}

function newVehicle(name, family = 'essence') {
  return { id: makeId(), name, family, tank: null, defaultFuel: null, hiddenFuels: [], extraFuels: [] };
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const validList = (data, isValid) => (Array.isArray(data) ? data.filter(isValid) : []);

// Guarantees at least one vehicle, attaches orphan data to the first one and
// picks a valid active vehicle.
function normalize({ fills, expenses, vehicles, settings }) {
  if (!vehicles.length) vehicles.push(newVehicle(t('vehicle.defaultName'), fills.length ? mainFamily(fills) : 'essence'));
  const ids = new Set(vehicles.map(v => v.id));
  const fallback = vehicles[0].id;
  for (const x of [...fills, ...expenses]) if (!ids.has(x.vehicleId)) x.vehicleId = fallback;
  if (!ids.has(settings.activeVehicleId)) settings.activeVehicleId = fallback;
  return { fills, expenses, vehicles, settings };
}

// French Excel expects ";" and a decimal comma, English Excel "," and a dot.
const csvFormat = () => (LANG === 'fr' ? { sep: ';', decimal: ',' } : { sep: ',', decimal: '.' });
// A text starting with = + - @ would run as a formula in Excel (vehicle name or
// note from an imported backup): an apostrophe keeps it as text.
const csvCell = c => `"${String(c).replace(/^[=+\-@\t\r]/, "'$&").replace(/"/g, '""')}"`;
function csv(rows) {
  const { sep } = csvFormat();
  return '\ufeff' + rows.map(r => r.map(csvCell).join(sep)).join('\r\n');
}
const csvNum = (n, d = 2) => n.toFixed(d).replace('.', csvFormat().decimal);

const Storage = {
  load() {
    // drive: settings of the former Google Drive backup, removed.
    const raw = readJSON(STORAGE_KEYS.settings, null);
    const { drive, ...saved } = raw || {};
    const settings = { ...DEFAULT_SETTINGS, ...saved };
    // Language and country follow the device until the user picks them. On the
    // very first launch, the country's currency and units are used as well.
    if (!saved.language) settings.language = detectLanguage();
    if (!saved.country) settings.country = detectCountry();
    if (!raw) Object.assign(settings, COUNTRIES[settings.country]?.defaults);
    cleanSettings(settings);
    setLocale(settings.language, settings.country);
    for (const key of OBSOLETE_KEYS) try { localStorage.removeItem(key); } catch {}
    return normalize({
      fills: validList(readJSON(STORAGE_KEYS.fills, []), isValidFill),
      expenses: validList(readJSON(STORAGE_KEYS.expenses, []), isValidExpense),
      vehicles: validList(readJSON(STORAGE_KEYS.vehicles, []), isValidVehicle),
      settings,
    });
  },

  save({ fills, expenses, vehicles, settings }) {
    try {
      localStorage.setItem(STORAGE_KEYS.fills, JSON.stringify(fills));
      localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
      localStorage.setItem(STORAGE_KEYS.vehicles, JSON.stringify(vehicles));
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
      return true;
    } catch {
      return false;
    }
  },

  // Accepts v1 (fill-ups), v2 (+ expenses) and v3 (+ vehicles) backups.
  // Returns { fills, expenses, vehicles }; vehicles is null for v1/v2.
  parseImport(text) {
    let data;
    try { data = JSON.parse(text); } catch { throw new Error(t('import.unreadable')); }
    const fills = Array.isArray(data) ? data : data?.fills;
    const expenses = Array.isArray(data) ? [] : data?.expenses || [];
    const vehicles = Array.isArray(data) ? null : data?.vehicles || null;
    if (!Array.isArray(fills) || !Array.isArray(expenses) || (vehicles && !Array.isArray(vehicles))) {
      throw new Error(t('import.notBackup'));
    }
    const bad = fills.filter(f => !isValidFill(f)).length
      + expenses.filter(e => !isValidExpense(e)).length
      + (vehicles || []).filter(v => !isValidVehicle(v)).length;
    if (bad) throw new Error(t('import.invalid', { n: bad }));
    if (vehicles) {
      if (!vehicles.length) throw new Error(t('import.noVehicle'));
      const ids = new Set(vehicles.map(v => v.id));
      if ([...fills, ...expenses].some(x => !ids.has(x.vehicleId))) {
        throw new Error(t('import.unknownVehicle'));
      }
    }
    return { fills, expenses, vehicles };
  },

  toJSON({ fills, expenses, vehicles }) {
    return JSON.stringify({
      app: 'carconso', version: 3, exportedAt: new Date().toISOString(), vehicles, fills, expenses,
    }, null, 2);
  },

  // Consumption is computed vehicle by vehicle, and attached to the fill-up
  // whose fuel was burned (as in the history). Always in km, litres, L/100 km.
  fillsToCSV(fills, vehicles) {
    const rows = [t('csv.fills').split('|')];
    for (const v of vehicles) {
      const own = fills.filter(f => f.vehicleId === v.id);
      const segByStart = Object.fromEntries(computeSegments(own).map(s => [s.startId, s]));
      for (const f of sortFills(own)) {
        const seg = segByStart[f.id];
        rows.push([
          v.name,
          f.date,
          f.odometer != null ? csvNum(f.odometer, 0) : '',
          csvNum(f.distance, 0),
          t(f.full ? 'csv.yes' : 'csv.no'),
          mixLabel(f),
          csvNum(fillLitres(f)),
          csvNum(fillTotal(f)),
          csvNum(fillPricePerLitre(f), 3),
          csvNum(fillEthanol(f), 1),
          seg ? csvNum(seg.l100) : '',
        ]);
      }
    }
    return csv(rows);
  },

  // One row per payment already due, recurring expenses included.
  expensesToCSV(expenses, vehicles, today) {
    const names = Object.fromEntries(vehicles.map(v => [v.id, v.name]));
    const rows = [t('csv.expenses').split('|')];
    for (const e of expandExpenses(expenses, today).sort((a, b) => (a.date < b.date ? -1 : 1))) {
      rows.push([
        names[e.vehicleId] || '',
        e.date,
        EXPENSE_CATEGORIES[e.category],
        csvNum(e.amount),
        e.recurrence ? RECURRENCES[e.recurrence].short : '',
        e.note || '',
      ]);
    }
    return csv(rows);
  },

  download(filename, content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};
