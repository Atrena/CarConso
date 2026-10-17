// Translations and regional settings: country, fuel names and default units.
// Loaded first: every other script uses t() and fuelLabel(). The texts of each
// language are in locales/*.js, loaded right after this file.

const LANGUAGES = {
  fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', it: 'Italiano', pt: 'Português', nl: 'Nederlands',
};

// Fuels sold in each country, with their local names. `names` can depend on the
// UI language (bilingual countries). Fuels without a local name use the
// international names below. `defaults` are applied on first launch, or when
// the user accepts them after changing country.
const COUNTRIES = {
  FR: {
    fuels: ['E5', 'E10', 'SP95P', 'SP98', 'SP98P', 'E85', 'B7', 'B7P'],
    names: { E5: 'SP-95', E10: 'SP-95 E10', SP95P: 'SP-95 Premium', SP98: 'SP-98', SP98P: 'SP-98 Premium', E85: 'E85', B7: 'Gazole', B7P: 'Gazole Premium' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  BE: {
    fuels: ['E10', 'SP98', 'B7', 'B7P'],
    names: {
      fr: { E10: 'Essence 95 E10', SP98: 'Essence 98 E5', B7: 'Diesel B7', B7P: 'Diesel Premium' },
      nl: { E10: 'Benzine 95 E10', SP98: 'Benzine 98 E5', B7: 'Diesel B7', B7P: 'Premium diesel' },
    },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  LU: {
    fuels: ['E10', 'SP98', 'B7', 'B7P'],
    names: { E10: 'Essence 95 E10', SP98: 'Super 98', B7: 'Diesel', B7P: 'Diesel Premium' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  CH: {
    fuels: ['E5', 'SP98', 'B7'],
    names: {
      fr: { E5: 'Sans plomb 95', SP98: 'Sans plomb 98', B7: 'Diesel' },
      en: { E5: 'Unleaded 95', SP98: 'Unleaded 98', B7: 'Diesel' },
      de: { E5: 'Bleifrei 95', SP98: 'Bleifrei 98', B7: 'Diesel' },
      it: { E5: 'Senza piombo 95', SP98: 'Senza piombo 98', B7: 'Diesel' },
    },
    defaults: { currency: 'CHF', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  CA: {
    fuels: ['REG', 'MID', 'PREM', 'E85', 'B7'],
    names: {
      fr: { REG: 'Ordinaire', MID: 'Intermédiaire', PREM: 'Super', E85: 'E85', B7: 'Diesel' },
      en: { REG: 'Regular', MID: 'Mid-grade', PREM: 'Premium', E85: 'E85', B7: 'Diesel' },
    },
    defaults: { currency: 'CAD', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  GB: {
    fuels: ['E10', 'SP98', 'B7', 'B7P'],
    names: { E10: 'Unleaded (E10)', SP98: 'Super Unleaded (E5)', B7: 'Diesel', B7P: 'Premium Diesel' },
    defaults: { currency: 'GBP', distanceUnit: 'mi', consoUnit: 'mpg-uk', volumeUnit: 'L' },
  },
  IE: {
    fuels: ['E10', 'SP98', 'B7', 'B7P'],
    names: { E10: 'Unleaded (E10)', SP98: 'Super Unleaded', B7: 'Diesel', B7P: 'Premium Diesel' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  US: {
    fuels: ['REG', 'MID', 'PREM', 'E85', 'B7'],
    names: { REG: 'Regular (87)', MID: 'Midgrade (89)', PREM: 'Premium (91–93)', E85: 'E85 (Flex Fuel)', B7: 'Diesel' },
    defaults: { currency: 'USD', distanceUnit: 'mi', consoUnit: 'mpg-us', volumeUnit: 'gal' },
  },
  DE: {
    fuels: ['E5', 'E10', 'SP98', 'SP98P', 'E85', 'B7', 'B7P'],
    names: { E5: 'Super E5', E10: 'Super E10', SP98: 'Super Plus', SP98P: 'Premium-Benzin', E85: 'E85', B7: 'Diesel', B7P: 'Premium-Diesel' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  AT: {
    fuels: ['E5', 'SP98', 'B7', 'B7P'],
    names: { E5: 'Super 95', SP98: 'Super Plus 98', B7: 'Diesel', B7P: 'Premium-Diesel' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  ES: {
    fuels: ['E5', 'SP98', 'B7', 'B7P'],
    names: { E5: 'Gasolina 95 E5', SP98: 'Gasolina 98 E5', B7: 'Gasóleo A', B7P: 'Gasóleo Premium' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  IT: {
    fuels: ['E5', 'SP98', 'B7', 'B7P'],
    names: { E5: 'Benzina', SP98: 'Benzina 98/100', B7: 'Gasolio', B7P: 'Gasolio Premium' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  PT: {
    fuels: ['E5', 'SP98', 'B7', 'B7P'],
    names: { E5: 'Gasolina 95', SP98: 'Gasolina 98', B7: 'Gasóleo', B7P: 'Gasóleo aditivado' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  NL: {
    fuels: ['E10', 'SP98', 'B7', 'B7P'],
    names: { E10: 'Euro 95 (E10)', SP98: 'Super Plus 98', B7: 'Diesel', B7P: 'Premium diesel' },
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
  MX: {
    fuels: ['REG', 'PREM', 'B7'],
    names: { REG: 'Magna', PREM: 'Premium', B7: 'Diésel' },
    defaults: { currency: 'MXN', distanceUnit: 'km', consoUnit: 'kml', volumeUnit: 'L' },
  },
  BR: {
    fuels: ['E27', 'E100', 'B7'],
    names: { E27: 'Gasolina comum', E100: 'Etanol', B7: 'Diesel S10' },
    defaults: { currency: 'BRL', distanceUnit: 'km', consoUnit: 'kml', volumeUnit: 'L' },
  },
  OTHER: {
    fuels: ['E5', 'E10', 'SP95P', 'SP98', 'SP98P', 'E85', 'B7', 'B7P'],
    names: {},
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
};

// International fuel names, by UI language (set in locales/*.js).
const FUEL_NAMES = {};

let LANG = 'fr';
let COUNTRY = 'FR';
let LOCALE = 'fr-FR';

function setLocale(language, country) {
  LANG = LANGUAGES[language] ? language : 'en';
  COUNTRY = COUNTRIES[country] ? country : 'OTHER';
  LOCALE = COUNTRY === 'OTHER' ? LANG : `${LANG}-${COUNTRY}`;
  document.documentElement.lang = LANG;
}

// Language and country of the device (e.g. "fr-BE" → fr / BE).
const deviceLocales = () => [...(navigator.languages || []), navigator.language].filter(Boolean);
function detectLanguage() {
  const lang = deviceLocales().map(l => l.slice(0, 2).toLowerCase()).find(l => LANGUAGES[l]);
  return lang || 'en';
}
function detectCountry() {
  for (const l of deviceLocales()) {
    const region = l.split('-')[1]?.toUpperCase();
    if (region && COUNTRIES[region]) return region;
    if (region) return 'OTHER';
  }
  return deviceLocales()[0]?.startsWith('fr') ? 'FR' : 'OTHER';
}

function countryFuels() {
  return COUNTRIES[COUNTRY].fuels;
}

// Local name in the country, if any (bilingual countries have one set of names
// per language), otherwise the international name.
function fuelLabel(key) {
  const names = COUNTRIES[COUNTRY].names;
  const local = Object.keys(names).some(k => LANGUAGES[k]) ? names[LANG] || {} : names;
  return local[key] || FUEL_NAMES[LANG][key] || key;
}

/* ---------- Messages ---------- */

const MESSAGES = {};

// t('key', { name: 'x' }) → translated text with {name} replaced.
function t(key, params = {}) {
  const text = MESSAGES[LANG][key] ?? MESSAGES.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (m, name) => (name in params ? params[name] : m));
}

// Plural following the language rules (in French 0 is singular, in English it is plural).
function tn(key, n, params = {}) {
  const one = new Intl.PluralRules(LANG).select(n) === 'one';
  return t(`${key}.${one ? 'one' : 'other'}`, { n, ...params });
}

// Static texts of the page: data-i18n (text), data-i18n-html (trusted markup
// from MESSAGES), data-i18n-placeholder / -aria-label / -title (attributes).
function translatePage(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  for (const attr of ['placeholder', 'aria-label', 'title']) {
    const data = `i18n${attr.replace(/(^|-)(\w)/g, (m, d, c) => c.toUpperCase())}`;
    root.querySelectorAll(`[data-i18n-${attr}]`).forEach(el => el.setAttribute(attr, t(el.dataset[data])));
  }
}
