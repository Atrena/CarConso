// "Settings" tab: vehicles, language and country, appearance, units,
// navigation, fuels (+ data, see data-view.js).

/* ---------- Vehicles ---------- */

let editingVehicleId = null; // id of the vehicle being edited, 'new' when adding one
let showAllFuels = false;    // vehicle form: also list the fuels of other countries

const familyFuels = family => FUEL_ORDER.filter(k => FUELS[k].family === family);

function renderVehicleList() {
  $('#vehicle-list').innerHTML = vehicles.map(v => {
    const nFills = fills.filter(f => f.vehicleId === v.id).length;
    const nExp = expenses.filter(e => e.vehicleId === v.id).length;
    const active = v.id === settings.activeVehicleId;
    return `<li><button type="button" data-id="${v.id}" class="${active ? 'is-active' : ''}">
      <span class="h-date">${escapeHTML(v.name)}</span>
      <span class="h-l100">${active ? `<span class="badge">${t('vehicle.active')}</span>` : ''}</span>
      <span class="badges">
        <span class="badge muted">${FAMILIES[v.family]}</span>
        ${v.tank ? `<span class="badge muted">${t('vehicle.tankBadge', { value: fmtVol(v.tank, 0) })}</span>` : ''}
      </span>
      <span class="h-meta">${tn('count.fills', nFills)} · ${tn('count.expenses', nExp)}</span>
    </button></li>`;
  }).join('');
}

$('#vehicle-list').addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (btn) openVehicleForm(btn.dataset.id);
});

$('#add-vehicle').addEventListener('click', () => openVehicleForm('new'));

const selectedFamily = () => $('#v-family input:checked')?.value || 'essence';
const editedVehicle = () => vehicles.find(v => v.id === editingVehicleId);

// Fuel chips of the chosen engine type (ticked = offered). Only the country's
// fuels are listed, plus those added by hand or already used, unless the user
// asks for every fuel.
function renderFuelChips(family, hidden = [], extra = []) {
  const used = new Set(fills.filter(f => f.vehicleId === editingVehicleId).flatMap(f => f.parts.map(p => p.fuel)));
  const all = familyFuels(family);
  const listed = all.filter(k => showAllFuels || countryFuels().includes(k) || extra.includes(k) || used.has(k));
  $('#v-fuels').innerHTML = listed.map(k => `
    <label><input type="checkbox" value="${k}" ${hidden.includes(k) ? '' : 'checked'}><span>${escapeHTML(FUELS[k].label)}</span></label>`).join('');
  $('#v-all-fuels').hidden = listed.length === all.length;
}

function renderDefaultFuel(selected) {
  const checked = [...$('#v-fuels').querySelectorAll('input:checked')].map(i => i.value);
  $('#v-default').innerHTML = `<option value="">${t('vehicle.lastUsed')}</option>`
    + checked.map(k => `<option value="${k}">${escapeHTML(FUELS[k].label)}</option>`).join('');
  $('#v-default').value = checked.includes(selected) ? selected : '';
}

// Hidden and extra fuels as currently shown in the form.
function readFuelChips(family) {
  const v = editedVehicle();
  const listed = [...$('#v-fuels').querySelectorAll('input')];
  const listedKeys = listed.map(i => i.value);
  const checked = listed.filter(i => i.checked).map(i => i.value);
  const previousHidden = (v?.hiddenFuels || []).filter(k => FUELS[k].family === family && !listedKeys.includes(k));
  return {
    shown: checked,
    hiddenFuels: [...previousHidden, ...listedKeys.filter(k => !checked.includes(k))],
    extraFuels: checked.filter(k => !countryFuels().includes(k)),
  };
}

function openVehicleForm(id) {
  const isNew = id === 'new';
  const v = isNew ? newVehicle('', 'essence') : vehicles.find(x => x.id === id);
  editingVehicleId = id;
  showAllFuels = false;

  $('#vehicle-form-title').textContent = isNew ? t('vehicle.new') : t('vehicle.edit', { name: v.name });
  $('#v-name').value = isNew ? '' : v.name;
  $('#v-tank').value = v.tank ? numToInput(+fromL(v.tank).toFixed(1)) : '';
  $('#v-family').querySelectorAll('input').forEach(i => { i.checked = i.value === v.family; });

  // Once fill-ups are entered, the engine type can no longer change.
  const locked = !isNew && fills.some(f => f.vehicleId === v.id);
  $('#v-family').querySelectorAll('input').forEach(i => { i.disabled = locked && i.value !== v.family; });
  $('#v-family-hint').textContent = locked ? t('vehicle.locked') : '';

  renderFuelChips(v.family, v.hiddenFuels, v.extraFuels || []);
  renderDefaultFuel(v.defaultFuel);
  $('#vehicle-delete').hidden = isNew || vehicles.length < 2;
  $('#vehicle-error').textContent = '';
  $('#vehicle-form').hidden = false;
  $('#add-vehicle').hidden = true;
  $('#vehicle-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (isNew) $('#v-name').focus();
}

function closeVehicleForm() {
  editingVehicleId = null;
  $('#vehicle-form').hidden = true;
  $('#add-vehicle').hidden = false;
}

$('#v-family').addEventListener('change', () => {
  renderFuelChips(selectedFamily());
  renderDefaultFuel(null);
});
$('#v-fuels').addEventListener('change', () => renderDefaultFuel($('#v-default').value));
$('#v-all-fuels').addEventListener('click', () => {
  const { hiddenFuels, extraFuels } = readFuelChips(selectedFamily());
  showAllFuels = true;
  // Fuels of other countries appear unticked: the user picks the ones they need.
  const others = familyFuels(selectedFamily()).filter(k => !countryFuels().includes(k) && !extraFuels.includes(k));
  renderFuelChips(selectedFamily(), [...hiddenFuels, ...others], extraFuels);
  renderDefaultFuel($('#v-default').value);
});
$('#vehicle-cancel').addEventListener('click', closeVehicleForm);

$('#vehicle-form').addEventListener('submit', e => {
  e.preventDefault();
  const error = msg => { $('#vehicle-error').textContent = msg; };
  const name = $('#v-name').value.trim();
  const tankRaw = $('#v-tank').value.trim();
  const original = editedVehicle()?.tank ?? null;
  const tank = tankRaw ? inputValue($('#v-tank'), original, fromL, toL, 1) : null;
  const family = selectedFamily();
  const { shown, hiddenFuels, extraFuels } = readFuelChips(family);
  if (!name) return error(t('vehicle.errName'));
  if (vehicles.some(v => v.id !== editingVehicleId && v.name.toLowerCase() === name.toLowerCase())) {
    return error(t('vehicle.errDuplicate'));
  }
  if (tank != null && !(tank > 0 && tank <= 300)) return error(t('vehicle.errTank', { unit: t(`fill.volume.${volUnit()}`).toLowerCase() }));
  if (!shown.length) return error(t('vehicle.errFuels'));

  const data = { name, family, tank, defaultFuel: $('#v-default').value || null, hiddenFuels, extraFuels };

  if (editingVehicleId === 'new') {
    const v = { ...newVehicle(name, family), ...data };
    vehicles.push(v);
    closeVehicleForm();
    switchVehicle(v.id); // also re-renders the Settings page
    toast(t('vehicle.added', { name }));
  } else {
    Object.assign(editedVehicle(), data);
    closeVehicleForm();
    persist();
    renderVehicleSwitch();
    resetForm(); // the offered fuels may have changed
    renderSettings();
    toast(t('vehicle.updated'));
  }
});

$('#vehicle-delete').addEventListener('click', () => {
  const v = editedVehicle();
  if (!v || vehicles.length < 2) return;
  const nFills = fills.filter(f => f.vehicleId === v.id).length;
  const nExp = expenses.filter(x => x.vehicleId === v.id).length;
  if (!confirm(t('vehicle.confirmDelete', { name: v.name, fills: tn('count.fills', nFills), expenses: tn('count.expenses', nExp) }))) return;
  vehicles = vehicles.filter(x => x.id !== v.id);
  fills = fills.filter(f => f.vehicleId !== v.id);
  expenses = expenses.filter(x => x.vehicleId !== v.id);
  closeVehicleForm();
  switchVehicle(settings.activeVehicleId === v.id ? vehicles[0].id : settings.activeVehicleId);
  toast(t('vehicle.deleted', { name: v.name }));
});

/* ---------- Customisation ---------- */

// Choices of each setting (data-setting in index.html), as [value, label],
// built at render time so that the labels follow the language.
const SETTING_CHOICES = {
  language: () => Object.entries(LANGUAGES),
  country: () => Object.keys(COUNTRIES).map(c => [c, t(`country.${c}`)]),
  theme: () => THEMES.map(v => [v, t(`theme.${v}`)]),
  textSize: () => TEXT_SIZES.map(v => [v, t(`text.${v}`)]),
  density: () => DENSITIES.map(v => [v, t(`density.${v}`)]),
  consoUnit: () => CONSO_UNITS.map(v => [v, { l100: 'L/100 km', kml: 'km/L', 'mpg-uk': 'mpg (UK)', 'mpg-us': 'mpg (US)' }[v]]),
  distanceUnit: () => DISTANCE_UNITS.map(v => [v, t(`dist.${v}`)]),
  volumeUnit: () => VOLUME_UNITS.map(v => [v, t(`vol.${v}`)]),
  currency: () => CURRENCIES.map(v => [v, t(`currency.${v}`)]),
  priceDecimals: () => [2, 3].map(v => [v, t(`dec.${v}`)]),
  startTab: () => START_TABS.map(v => [v, t(`nav.${v}`)]),
};
const NUMERIC_SETTINGS = ['priceDecimals'];

function renderSettingControls() {
  document.querySelectorAll('[data-setting]').forEach(el => {
    const key = el.dataset.setting;
    const choices = SETTING_CHOICES[key]();
    el.innerHTML = el.tagName === 'SELECT'
      ? choices.map(([v, label]) => `<option value="${v}">${escapeHTML(label)}</option>`).join('')
      : choices.map(([v, label]) => `<label><input type="radio" name="set-${key}" value="${v}"><span>${escapeHTML(label)}</span></label>`).join('');
    const value = String(settings[key]);
    if (el.tagName === 'SELECT') el.value = value;
    else el.querySelectorAll('input').forEach(i => { i.checked = i.value === value; });
  });
  $('#accent').innerHTML = ACCENTS.map(v => `
    <label title="${t(`accent.${v}`)}"><input type="radio" name="set-accent" value="${v}" ${v === settings.accent ? 'checked' : ''}><span class="swatch" data-swatch="${v}"></span><span class="visually-hidden">${t(`accent.${v}`)}</span></label>`).join('');
}

// Re-renders everything that depends on the language, units and colours.
function settingsChanged() {
  persist();
  refreshAll();
}

// Offers the new country's currency and units, if they differ.
function offerRegionDefaults() {
  const defaults = COUNTRIES[settings.country].defaults;
  const changes = Object.entries(defaults).filter(([key, value]) => settings[key] !== value);
  if (!changes.length) return;
  const label = {
    currency: v => t(`currency.${v}`), distanceUnit: v => t(`dist.${v}`),
    consoUnit: v => SETTING_CHOICES.consoUnit().find(([k]) => k === v)[1], volumeUnit: v => t(`vol.${v}`),
  };
  const names = { currency: 'currency', distanceUnit: 'distance', consoUnit: 'conso', volumeUnit: 'volume' };
  const colon = LANG === 'fr' ? ' : ' : ': ';
  const details = changes.map(([key, value]) => `${t(`settings.${names[key]}`)}${colon}${label[key](value)}`).join('\n');
  if (confirm(t('settings.applyRegion', { details }))) Object.assign(settings, Object.fromEntries(changes));
}

document.querySelectorAll('[data-setting]').forEach(el => el.addEventListener('change', e => {
  const key = el.dataset.setting;
  settings[key] = NUMERIC_SETTINGS.includes(key) ? Number(e.target.value) : e.target.value;
  if (key === 'country') {
    setLocale(settings.language, settings.country);
    offerRegionDefaults();
  }
  settingsChanged();
}));

$('#accent').addEventListener('change', e => {
  settings.accent = e.target.value;
  settingsChanged();
});

$('#visible-tabs').addEventListener('change', () => {
  const shown = [...$('#visible-tabs').querySelectorAll('input:checked')].map(i => i.value);
  settings.hiddenTabs = OPTIONAL_TABS.filter(tab => !shown.includes(tab));
  if (settings.hiddenTabs.includes(settings.startTab)) settings.startTab = 'add';
  settingsChanged();
});

$('#default-full').addEventListener('change', e => {
  settings.defaultFull = e.target.checked;
  settingsChanged();
});

// E85 ethanol content: 65 to 85%, changed one point at a time with − / +.
function stepE85(delta) {
  const value = Math.min(85, Math.max(65, settings.e85Ethanol + delta));
  if (value === settings.e85Ethanol) return;
  settings.e85Ethanol = value;
  applySettings();
  persist();
  renderE85();
  toast(t('settings.e85Toast', { n: value }));
}

function renderE85() {
  $('#e85-value').textContent = fmtPct(settings.e85Ethanol);
  $('#e85-minus').disabled = settings.e85Ethanol <= 65;
  $('#e85-plus').disabled = settings.e85Ethanol >= 85;
}

$('#e85-minus').addEventListener('click', () => stepE85(-1));
$('#e85-plus').addEventListener('click', () => stepE85(1));

/* ---------- Rendering ---------- */

function renderSettings() {
  renderVehicleList();
  renderSettingControls();
  $('#visible-tabs').innerHTML = OPTIONAL_TABS.map(tab => `
    <label><input type="checkbox" value="${tab}" ${settings.hiddenTabs.includes(tab) ? '' : 'checked'}><span>${t(`nav.${tab}`)}</span></label>`).join('');
  // The start screen cannot be a hidden tab.
  $('[data-setting="startTab"]').querySelectorAll('option').forEach(o => { o.disabled = settings.hiddenTabs.includes(o.value); });
  $('#default-full').checked = settings.defaultFull;
  // The E85 setting only matters where E85 is sold, or if it was already used.
  $('#fuels-section').hidden = !countryFuels().includes('E85') && !fills.some(f => f.parts.some(p => p.fuel === 'E85'));
  $('#app-version').textContent = `CarConso ${APP_VERSION}`;
  $('#privacy-link').href = t('about.privacyUrl');
  renderE85();
  renderData();
}
