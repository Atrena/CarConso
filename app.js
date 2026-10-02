// Shared UI helpers, fill-up form and history.

const $ = sel => document.querySelector(sel);

const APP_VERSION = '1.0.0';
const SOURCE_URL = 'https://github.com/Atrena/CarConso';

const numberFormats = {};
function nf(d) {
  const key = `${LOCALE}-${d}`;
  numberFormats[key] ||= new Intl.NumberFormat(LOCALE, { minimumFractionDigits: d, maximumFractionDigits: d });
  return numberFormats[key];
}
const fmt = (n, d = 2) => (n == null || !Number.isFinite(n) ? '—' : nf(d).format(n));
const fmtPct = n => new Intl.NumberFormat(LOCALE, { style: 'percent', maximumFractionDigits: 0 }).format(n / 100);
const decimalSeparator = () => nf(1).formatToParts(1.5).find(p => p.type === 'decimal').value;

/* ---------- Units (settings) ---------- */
// Data is always stored in km, litres, L/100 km and the chosen currency: these
// functions are only used for input and display.

const moneyFormats = {};
function money(n, d = 2) {
  if (n == null || !Number.isFinite(n)) return '—';
  const key = `${LOCALE}-${settings.currency}-${d}`;
  moneyFormats[key] ||= new Intl.NumberFormat(LOCALE, {
    style: 'currency', currency: settings.currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: d, maximumFractionDigits: d,
  });
  return moneyFormats[key].format(n);
}
const currencySymbol = () => money(0).replace(/[\d\s,.\u00a0\u202f]/g, '');

const KM_PER_MILE = 1.609344;
const distUnit = () => settings.distanceUnit;
const fromKm = km => (settings.distanceUnit === 'mi' ? km / KM_PER_MILE : km);
const toKm = d => (settings.distanceUnit === 'mi' ? d * KM_PER_MILE : d);
const fmtDist = (km, d = 0) => `${fmt(fromKm(km), d)} ${distUnit()}`;
// Cost per 100 km or per 100 miles.
const per100 = costPerKm => costPerKm * toKm(100);
const per100Label = () => `/100 ${distUnit()}`;

const LITRES_PER_GALLON = 3.785411784;
const volUnit = () => settings.volumeUnit;
const fromL = l => (settings.volumeUnit === 'gal' ? l / LITRES_PER_GALLON : l);
const toL = v => (settings.volumeUnit === 'gal' ? v * LITRES_PER_GALLON : v);
const fmtVol = (l, d = 2) => `${fmt(fromL(l), d)} ${volUnit()}`;
// Price per litre or per gallon, from a price per litre.
const pricePerVol = pricePerLitre => pricePerLitre * toL(1);
const fmtPrice = pricePerLitre => money(pricePerVol(pricePerLitre), settings.priceDecimals);
const perVolLabel = () => t(settings.volumeUnit === 'gal' ? 'unit.perGal' : 'unit.perL');

const CONSO_FORMATS = {
  l100: { unit: 'L/100 km', short: 'L/100', digits: 2, from: l100 => l100 },
  kml: { unit: 'km/L', short: 'km/L', digits: 1, from: l100 => 100 / l100 },
  'mpg-uk': { unit: 'mpg', short: 'mpg', digits: 1, from: l100 => 282.481 / l100 },
  'mpg-us': { unit: 'mpg', short: 'mpg', digits: 1, from: l100 => 235.215 / l100 },
};
const consoFormat = () => CONSO_FORMATS[settings.consoUnit];
const consoValue = l100 => (l100 > 0 ? consoFormat().from(l100) : null);
const fmtConsoNum = l100 => fmt(consoValue(l100), consoFormat().digits);
const fmtConso = l100 => `${fmtConsoNum(l100)} ${consoFormat().unit}`;

const fmtDate = iso => new Date(`${iso}T00:00`).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' });
const fmtMonth = key => new Date(`${key}-01T00:00`).toLocaleDateString(LOCALE, { month: 'short', year: '2-digit' });
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Fuel name for innerHTML: "SP-95" must never be split at the hyphen.
const fuelHTML = label => escapeHTML(label).replace(/SP-\d+/g, '<span class="nowrap">$&</span>');

const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const todayISO = () => isoDate(new Date());

// Accepts "42,5", "45 210", "42.5", and "45,210" when the decimal separator is a dot.
function parseNum(str) {
  let s = String(str).trim().replace(/[\s\u00a0\u202f]/g, '');
  s = decimalSeparator() === '.' ? s.replace(/,/g, '') : s.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
  return Number(s);
}
const numToInput = n => String(n).replace('.', decimalSeparator());
const newId = makeId;

// Value of an input typed in the display unit, converted back with `convert`.
// A value shown again without being touched keeps its exact original value
// (no rounding drift in miles or gallons).
function inputValue(input, original, fromStored, convert, digits) {
  if (original != null && input.value === numToInput(+fromStored(original).toFixed(digits))) return original;
  const value = parseNum(input.value);
  return Number.isFinite(value) ? convert(value) : value;
}

/* ---------- State ---------- */

// fills / expenses hold the data of every vehicle; the screens work on the
// active vehicle's (curFills / curExpenses).
let { fills, expenses, vehicles, settings } = Storage.load();
let editingId = null;

const activeVehicle = () => vehicles.find(v => v.id === settings.activeVehicleId);
const curFills = () => fills.filter(f => f.vehicleId === settings.activeVehicleId);
const curExpenses = () => expenses.filter(e => e.vehicleId === settings.activeVehicleId);

// Fuels offered for a vehicle: its family, sold in the country (or added by
// hand from another country), minus the hidden ones.
const visibleFuels = v => FUEL_ORDER.filter(k => FUELS[k].family === v.family
  && (countryFuels().includes(k) || v.extraFuels?.includes(k)) && !v.hiddenFuels.includes(k));

function persist() {
  if (!Storage.save({ fills, expenses, vehicles, settings })) toast(t('toast.saveError'));
  updateBackupDot();
}

function applySettings() {
  setLocale(settings.language, settings.country);
  FUELS.E85.ethanol = settings.e85Ethanol;
  const root = document.documentElement;
  if (settings.theme === 'auto') root.removeAttribute('data-theme');
  else root.dataset.theme = settings.theme;
  root.dataset.accent = settings.accent;
  root.dataset.text = settings.textSize;
  root.dataset.density = settings.density;
  $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--accent').trim();

  translatePage();
  document.querySelectorAll('.tabbar button').forEach(b => { b.hidden = settings.hiddenTabs.includes(b.dataset.tab); });
  document.querySelectorAll('.unit-dist').forEach(el => { el.textContent = distUnit(); });
  document.querySelectorAll('.unit-vol').forEach(el => { el.textContent = volUnit(); });
  document.querySelectorAll('.unit-money').forEach(el => { el.textContent = currencySymbol(); });
  $('#f-odometer').placeholder = fmt(45210, 0);
  $('#f-distance').placeholder = fmt(610, 0);
  $('#e-amount').placeholder = fmt(89.9, 2);
  $('#v-tank').placeholder = fmt(volUnit() === 'gal' ? 13 : 50, 0);
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ---------- Tabs ---------- */

const TAB_RENDERERS = {
  history: () => renderHistory(),
  expenses: () => renderExpenses(),
  stats: () => renderStats(),
  sim: () => renderSimulator(),
  settings: () => renderSettings(),
};
let currentTab = 'add';

function showTab(name) {
  currentTab = name;
  document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.id === `tab-${name}`));
  document.querySelectorAll('.tabbar button').forEach(b => {
    const on = b.dataset.tab === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
  });
  $('#open-settings').classList.toggle('active', name === 'settings');
  TAB_RENDERERS[name]?.();
  window.scrollTo(0, 0);
}

document.querySelectorAll('.tabbar button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
$('#open-settings').addEventListener('click', () => showTab('settings'));

// After a change of language, country or units: every text is rebuilt.
function refreshAll() {
  applySettings();
  fillExpenseOptions();
  renderVehicleSwitch();
  resetForm();
  resetExpenseForm();
  TAB_RENDERERS[currentTab]?.();
}

/* ---------- Active vehicle ---------- */

function renderVehicleSwitch() {
  const select = $('#vehicle-switch');
  select.innerHTML = vehicles.map(v => `<option value="${v.id}">${escapeHTML(v.name)}</option>`).join('');
  select.value = settings.activeVehicleId;
  select.disabled = vehicles.length < 2;
}

function switchVehicle(id) {
  settings.activeVehicleId = id;
  persist();
  renderVehicleSwitch();
  resetForm();
  resetExpenseForm();
  TAB_RENDERERS[currentTab]?.();
}

$('#vehicle-switch').addEventListener('change', e => {
  switchVehicle(e.target.value);
  toast(t('toast.vehicle', { name: activeVehicle().name }));
});

/* ---------- Odometer ---------- */

// Odometer of each fill-up: entered, or derived from the previous one + distance.
function odometerMap(list) {
  const map = {};
  let prev = null;
  for (const f of sortFills(list)) {
    const odo = f.odometer != null ? f.odometer : prev != null ? prev + f.distance : null;
    map[f.id] = odo;
    prev = odo;
  }
  return map;
}

// Fill-ups of the active vehicle dated before the one being entered.
function fillsBefore() {
  const date = $('#f-date').value;
  const editing = fills.find(f => f.id === editingId);
  const createdAt = editing ? editing.createdAt || 0 : Infinity;
  return sortFills(curFills().filter(f => f.id !== editingId))
    .filter(f => f.date < date || (f.date === date && (f.createdAt || 0) < createdAt));
}

// Odometer of the fill-up before the one being entered, or null if unknown.
function previousOdometer() {
  const before = fillsBefore();
  if (!before.length) return null;
  return odometerMap(curFills().filter(f => f.id !== editingId))[before[before.length - 1].id];
}

// The last field typed (odometer or distance) wins; the other one is derived.
let lastTyped = 'distance';

// The odometer and distance fields are in the chosen unit (km or miles).
function syncOdometer() {
  const prevKm = previousOdometer();
  const odoInput = $('#f-odometer');
  const distInput = $('#f-distance');
  if (prevKm != null) {
    const prev = fromKm(prevKm);
    if (lastTyped === 'odometer') {
      const odo = parseNum(odoInput.value);
      distInput.value = odo > prev ? numToInput(+(odo - prev).toFixed(1)) : '';
    } else {
      const dist = parseNum(distInput.value);
      odoInput.value = dist > 0 ? numToInput(+(prev + dist).toFixed(1)) : '';
    }
    $('#odo-hint').textContent = t('odo.previous', { value: fmtDist(prevKm) });
  } else {
    $('#odo-hint').textContent = t(curFills().length && !editingId ? 'odo.unknown' : 'odo.first');
  }
}

$('#f-odometer').addEventListener('input', () => { lastTyped = 'odometer'; syncOdometer(); updatePreview(); });
$('#f-distance').addEventListener('input', () => { lastTyped = 'distance'; syncOdometer(); updatePreview(); });
$('#f-date').addEventListener('change', () => { syncOdometer(); updatePreview(); });
$('#f-full').addEventListener('change', updatePreview);

/* ---------- Fuels ---------- */

// The vehicle's default fuel, otherwise the last one used, otherwise the first offered.
function defaultFuel() {
  const v = activeVehicle();
  const fuels = visibleFuels(v);
  if (fuels.includes(v.defaultFuel)) return v.defaultFuel;
  const last = sortFills(curFills()).pop()?.parts[0].fuel;
  return fuels.includes(last) ? last : fuels[0] || FUEL_ORDER.find(k => FUELS[k].family === v.family);
}

const partRows = () => [...$('#parts').querySelectorAll('.part')];

// Fuels offered in the lists, plus the ones already on the fill-up being edited.
function fuelChoices() {
  const keep = editingId ? fills.find(f => f.id === editingId).parts.map(p => p.fuel) : [];
  const fuels = new Set([...visibleFuels(activeVehicle()), ...keep]);
  return FUEL_ORDER.filter(k => fuels.has(k));
}

function addPartRow(part = {}) {
  const row = document.createElement('div');
  row.className = 'part';
  const options = fuelChoices().map(k => `<option value="${k}">${escapeHTML(FUELS[k].label)}</option>`).join('');
  const volName = t(`fill.volume.${volUnit()}`);
  row.innerHTML = `
    <select class="p-fuel" aria-label="${escapeHTML(t('fill.fuelType'))}">${options}</select>
    <div class="suffix p-litres"><input type="text" inputmode="decimal" placeholder="${volName}" aria-label="${volName}"><em class="unit-vol">${volUnit()}</em></div>
    <div class="suffix p-total"><input type="text" inputmode="decimal" placeholder="${escapeHTML(t('fill.totalPrice'))}" aria-label="${escapeHTML(t('fill.totalPrice'))}"><em class="unit-money">${escapeHTML(currencySymbol())}</em></div>
    <button type="button" class="icon-btn p-remove" aria-label="${escapeHTML(t('fill.removeFuel'))}">×</button>`;
  row.querySelector('select').value = part.fuel || defaultFuel();
  if (part.litres != null) {
    row.querySelector('.p-litres input').value = numToInput(+fromL(part.litres).toFixed(2));
    row.dataset.litres = part.litres;
  }
  if (part.total != null) row.querySelector('.p-total input').value = numToInput(part.total);
  row.querySelector('.p-remove').addEventListener('click', () => { row.remove(); syncPartRows(); updatePreview(); });
  row.querySelector('select').addEventListener('change', syncPartRows);
  $('#parts').appendChild(row);
  syncPartRows();
}

// Greys out the fuels incompatible with the other rows, and those already chosen.
function syncPartRows() {
  const rows = partRows();
  rows.forEach(row => {
    const others = rows.filter(r => r !== row).map(r => r.querySelector('select').value);
    const family = others.length ? FUELS[others[0]].family : null;
    row.querySelectorAll('option').forEach(o => {
      o.disabled = others.includes(o.value) || (family && FUELS[o.value].family !== family);
    });
    row.querySelector('.p-remove').style.visibility = rows.length > 1 ? 'visible' : 'hidden';
  });
  $('#add-part').hidden = fuelChoices().length < 2;
  $('#add-part').disabled = !nextFuelForMix();
}

function nextFuelForMix() {
  const used = readParts().map(p => p.fuel);
  if (!used.length) return null;
  const family = FUELS[used[0]].family;
  return fuelChoices().find(k => FUELS[k].family === family && !used.includes(k)) || null;
}

// Quantities are typed in litres or gallons and returned in litres.
function readParts() {
  return partRows().map(r => {
    const original = r.dataset.litres ? Number(r.dataset.litres) : null;
    return {
      fuel: r.querySelector('select').value,
      litres: inputValue(r.querySelector('.p-litres input'), original, fromL, toL, 2),
      total: parseNum(r.querySelector('.p-total input').value),
    };
  });
}

/* ---------- Fill-up form ---------- */

function updatePreview() {
  const parts = readParts().filter(p => p.litres > 0 && p.total >= 0);
  const el = $('#preview');
  if (!parts.length) { el.innerHTML = ''; return; }
  const f = { parts };
  const rows = [
    [t('preview.total'), fmtVol(fillLitres(f))],
    [t('preview.amount'), money(fillTotal(f))],
    [t('preview.price', { per: perVolLabel() }), fmtPrice(fillPricePerLitre(f))],
  ];
  if (FUELS[parts[0].fuel].family === 'essence') rows.push([t('preview.ethanol'), fmtPct(fillEthanol(f))]);
  if (parts.length > 1) rows.push([t('preview.mix'), fuelHTML(mixLabel(f))]);
  // Trip closed by this fill-up, computed exactly as it will be once saved: the
  // fuel burned (and its price) is the previous fill-up's.
  const distance = parseNum($('#f-distance').value);
  if (partsCompatible(parts) && new Set(parts.map(p => p.fuel)).size === parts.length) {
    const editing = fills.find(x => x.id === editingId);
    const draft = {
      id: 'draft', date: $('#f-date').value || todayISO(), createdAt: editing ? editing.createdAt || 0 : Date.now(),
      distance: distance > 0 ? toKm(distance) : 0, full: $('#f-full').checked, parts,
    };
    const seg = computeSegments([...curFills().filter(x => x.id !== editingId), draft]).find(s => s.endId === 'draft');
    if (seg) {
      rows.push([t('preview.conso', { date: fmtDate(seg.startDate) }), fmtConso(seg.l100)]);
      rows.push([t('preview.cost', { per100: per100Label() }), money(per100(seg.cost / seg.km))]);
    }
  }
  el.innerHTML = rows.map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join('');
}

function setFormMode(editing) {
  $('#form-title').textContent = t(editing ? 'fill.edit' : 'fill.new');
  $('#submit-btn').textContent = t(editing ? 'common.update' : 'common.save');
  $('#cancel-edit').hidden = !editing;
  $('#delete-fill').hidden = !editing;
  $('#form-error').textContent = '';
}

function resetForm() {
  editingId = null;
  lastTyped = 'distance';
  $('#fill-form').reset();
  $('#f-date').value = todayISO();
  $('#f-full').checked = settings.defaultFull;
  $('#parts').innerHTML = '';
  addPartRow();
  setFormMode(false);
  syncOdometer();
  updatePreview();
}

function startEdit(id) {
  const f = fills.find(x => x.id === id);
  if (!f) return;
  editingId = id;
  lastTyped = 'distance';
  $('#f-date').value = f.date;
  $('#f-distance').value = f.distance ? numToInput(+fromKm(f.distance).toFixed(1)) : '';
  $('#f-odometer').value = f.odometer != null ? numToInput(+fromKm(f.odometer).toFixed(1)) : '';
  $('#f-full').checked = f.full;
  $('#parts').innerHTML = '';
  f.parts.forEach(addPartRow);
  setFormMode(true);
  syncOdometer();
  updatePreview();
  showTab('add');
}

function validateFill() {
  const date = $('#f-date').value;
  const editing = fills.find(f => f.id === editingId);
  // The first fill-up is only a reference: the distance before it is optional.
  const first = !fillsBefore().length;
  const distance = first && !$('#f-distance').value.trim() ? 0
    : inputValue($('#f-distance'), editing?.distance, fromKm, toKm, 1);
  const odoRaw = $('#f-odometer').value.trim();
  const odometer = odoRaw ? inputValue($('#f-odometer'), editing?.odometer, fromKm, toKm, 1) : null;
  const prev = previousOdometer();
  const parts = readParts();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: t('err.date') };
  if (odometer != null && !(odometer >= 0)) return { error: t('err.odoNumber', { unit: distUnit() }) };
  if (odometer != null && prev != null && odometer <= prev) {
    return { error: t('err.odoPrevious', { value: fmtDist(prev) }) };
  }
  if (!(distance > 0) && !(first && distance === 0)) return { error: t('err.distance') };
  for (const p of parts) {
    if (!(p.litres > 0)) return { error: t('err.volume') };
    if (!(p.total > 0)) return { error: t('err.total') };
  }
  const fuels = parts.map(p => p.fuel);
  if (new Set(fuels).size !== fuels.length) return { error: t('err.duplicateFuel') };
  if (!partsCompatible(parts)) return { error: t('err.mixFamilies') };
  return { date, distance, odometer, full: $('#f-full').checked, parts };
}

$('#fill-form').addEventListener('submit', e => {
  e.preventDefault();
  const v = validateFill();
  if (v.error) { $('#form-error').textContent = v.error; return; }

  const data = { date: v.date, distance: v.distance, odometer: v.odometer, full: v.full, parts: v.parts };
  let fill;
  if (editingId) {
    fill = fills.find(x => x.id === editingId);
    Object.assign(fill, data);
  } else {
    fill = { id: newId(), vehicleId: settings.activeVehicleId, createdAt: Date.now(), ...data };
    fills.push(fill);
  }
  persist();

  // The fill-up that closes a trip gives the consumption of the previous fuel;
  // its own will be known at the next full fill-up.
  const seg = computeSegments(curFills()).find(s => s.endId === fill.id);
  const wasEdit = !!editingId;
  resetForm();
  const title = t(!fill.full ? 'toast.partialSaved' : wasEdit ? 'toast.fillUpdated' : 'toast.fillSaved');
  if (seg) toast(t('toast.fillConso', { title, date: fmtDate(seg.startDate), conso: fmtConso(seg.l100) }));
  else toast(t('toast.fillLater', { title }));
});

$('#add-part').addEventListener('click', () => {
  const next = nextFuelForMix();
  if (!next) return;
  addPartRow({ fuel: next });
  updatePreview();
});
$('#parts').addEventListener('input', e => {
  // A quantity typed by hand no longer refers to the stored value.
  if (e.target.closest('.p-litres')) delete e.target.closest('.part').dataset.litres;
  updatePreview();
});
$('#parts').addEventListener('change', updatePreview);
$('#cancel-edit').addEventListener('click', () => { resetForm(); showTab('history'); });
$('#delete-fill').addEventListener('click', () => {
  if (!editingId || !confirm(t('fill.confirmDelete'))) return;
  fills = fills.filter(f => f.id !== editingId);
  persist();
  resetForm();
  toast(t('toast.fillDeleted'));
  showTab('history');
});

/* ---------- History ---------- */

function renderHistory() {
  const list = $('#history');
  const own = curFills();
  if (!own.length) {
    list.innerHTML = `<li class="empty">${t('history.empty')}</li>`;
    return;
  }
  // The consumption is shown on the fill-up whose fuel was burned; the last
  // full fill-up's will be known at the next one.
  const segByStart = Object.fromEntries(computeSegments(own).map(s => [s.startId, s]));
  const odo = odometerMap(own);
  const sorted = sortFills(own);
  const lastFull = sorted.filter(f => f.full).pop();
  list.innerHTML = sorted.reverse().map(f => {
    const seg = segByStart[f.id];
    const l100 = seg ? `${fmtConsoNum(seg.l100)} <small>${consoFormat().short}</small>`
      : f === lastFull ? `<small>${t('history.current')}</small>` : '<small>—</small>';
    const odoText = odo[f.id] != null ? `<br>${t('history.odometer', { value: fmtDist(odo[f.id]) })}` : '';
    return `<li><button type="button" data-id="${f.id}">
      <span class="h-date">${fmtDate(f.date)}</span>
      <span class="h-l100">${l100}</span>
      <span class="badges">
        <span class="badge">${fuelHTML(mixLabel(f))}</span>
        ${f.full ? '' : `<span class="badge muted">${t('history.partial')}</span>`}
      </span>
      <span class="h-meta">${fmtVol(fillLitres(f))}${f.distance ? ` · ${fmtDist(f.distance)}` : ''} · ${money(fillTotal(f))} · ${fmtPrice(fillPricePerLitre(f))}/${volUnit()}${odoText}</span>
    </button></li>`;
  }).join('');
}

$('#history').addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (btn) startEdit(btn.dataset.id);
});

/* ---------- Startup ---------- */

// Saves a possible migration right away (first vehicle created, data attached).
Storage.save({ fills, expenses, vehicles, settings });
applySettings();
renderVehicleSwitch();
resetForm();
// Start screen, once every tab script is loaded.
document.addEventListener('DOMContentLoaded', () => { if (settings.startTab !== 'add') showTab(settings.startTab); });

// In the Android app the files are already on the phone: no offline cache.
if ('serviceWorker' in navigator && location.protocol !== 'file:' && !IS_APP) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
