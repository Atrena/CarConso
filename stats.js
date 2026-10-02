// Pure calculations: no DOM access. Labels come from i18n.js (t, fuelLabel).

// Fuels: family (only fuels of the same family can be mixed) and reference
// ethanol content (%). Names depend on the country (see COUNTRIES in i18n.js).
// REG / MID / PREM are the North American grades (usually E10).
const FUELS = {
  E5:    { family: 'essence', ethanol: 5 },
  E10:   { family: 'essence', ethanol: 10 },
  SP95P: { family: 'essence', ethanol: 5 },
  SP98:  { family: 'essence', ethanol: 5 },
  SP98P: { family: 'essence', ethanol: 5 },
  REG:   { family: 'essence', ethanol: 10 },
  MID:   { family: 'essence', ethanol: 10 },
  PREM:  { family: 'essence', ethanol: 10 },
  E85:   { family: 'essence', ethanol: 75 },
  B7:    { family: 'diesel',  ethanol: 0 },
  B7P:   { family: 'diesel',  ethanol: 0 },
};
const FUEL_ORDER = Object.keys(FUELS);
for (const k of FUEL_ORDER) Object.defineProperty(FUELS[k], 'label', { get: () => fuelLabel(k), enumerable: true });

// Translated labels, read at display time: { key: label } objects whose values
// follow the current language.
function translatedTable(keys, prefix) {
  const table = {};
  for (const k of keys) Object.defineProperty(table, k, { get: () => t(`${prefix}.${k}`), enumerable: true });
  return table;
}

const FAMILIES = translatedTable(['essence', 'diesel'], 'family');

const EXPENSE_CATEGORIES = translatedTable(
  ['entretien', 'pneus', 'reparation', 'assurance', 'controle', 'peage', 'parking', 'lavage', 'autre'], 'category');

// Recurring expenses: number of months between two payments.
const RECURRENCES = {};
for (const [k, months] of Object.entries({ monthly: 1, quarterly: 3, semiannual: 6, yearly: 12 })) {
  RECURRENCES[k] = {
    months,
    get label() { return t(`rec.${k}`); },
    get short() { return t(`recShort.${k}`); },
    get per() { return t(`recPer.${k}`); },
  };
}

// Estimated extra consumption per point of ethanol, only used for a fuel that
// was never measured (≈ +23% for E85 compared with E10).
const ETHANOL_OVERCONSUMPTION = 0.0035;

// A segment is assigned to a fuel when it contains at least 80% of it.
const DOMINANT_SHARE = 0.8;

const sum = (arr, fn) => arr.reduce((acc, x) => acc + fn(x), 0);

const fillLitres = f => sum(f.parts, p => p.litres);
const fillTotal  = f => sum(f.parts, p => p.total);
const fillPricePerLitre = f => { const l = fillLitres(f); return l > 0 ? fillTotal(f) / l : 0; };
const fillEthanol = f => {
  const l = fillLitres(f);
  return l > 0 ? sum(f.parts, p => p.litres * FUELS[p.fuel].ethanol) / l : 0;
};
const fillFamily = f => FUELS[f.parts[0].fuel].family;

const partsCompatible = parts => new Set(parts.map(p => FUELS[p.fuel].family)).size <= 1;

function litresByFuel(fills) {
  const byFuel = {};
  for (const f of fills) for (const p of f.parts) byFuel[p.fuel] = (byFuel[p.fuel] || 0) + p.litres;
  return byFuel;
}

// "SP-95 E10" or "50 % SP-95 E10 / 50 % E85"
function mixLabel(f) {
  const byFuel = litresByFuel([f]);
  const keys = Object.keys(byFuel);
  if (keys.length === 1) return FUELS[keys[0]].label;
  const total = fillLitres(f);
  return keys
    .sort((a, b) => byFuel[b] - byFuel[a])
    .map(k => t('mix.share', { pct: Math.round(byFuel[k] / total * 100), name: FUELS[k].label }))
    .join(' / ');
}

// Classifies a set of litres: dominant fuel, or blend of the two main ones.
function mixGroup(byFuel) {
  const total = sum(Object.values(byFuel), x => x);
  const keys = Object.keys(byFuel).sort((a, b) => byFuel[b] - byFuel[a]);
  if (byFuel[keys[0]] / total >= DOMINANT_SHARE) return { key: keys[0], label: FUELS[keys[0]].label };
  const pair = keys.slice(0, 2).sort((a, b) => FUEL_ORDER.indexOf(a) - FUEL_ORDER.indexOf(b));
  return { key: pair.join('+'), label: t('mix.group', { names: pair.map(k => FUELS[k].label).join(' + ') }) };
}

function sortFills(fills) {
  return [...fills].sort((a, b) =>
    a.date === b.date ? (a.createdAt || 0) - (b.createdAt || 0) : a.date < b.date ? -1 : 1);
}

// Fill-to-fill method: partial fill-ups accumulate until the next full one,
// which closes a segment. The litres of a fill-up replace what was burned over
// the distance driven before it. The first full fill-up is only a reference
// (what was in the tank before is unknown): the first consumption appears at
// the next full fill-up.
// The fuel actually burned on a segment is what was in the tank: the fill-ups
// of the previous segment, plus partial fill-ups on the way (not the closing
// fill-up, which feeds the next trip).
function computeSegments(fills) {
  const segments = [];
  let pending = [];
  let previous = null;
  for (const f of sortFills(fills)) {
    pending.push(f);
    if (!f.full) continue;
    if (!previous || fillFamily(previous[0]) !== fillFamily(f)) {
      previous = [f];
      pending = [];
      continue;
    }
    const litres = sum(pending, fillLitres);
    const km = sum(pending, x => x.distance);
    const burned = [...previous, ...pending.slice(0, -1)];
    const burnedLitres = sum(burned, fillLitres);
    if (km > 0) {
      const group = mixGroup(litresByFuel(burned));
      const start = previous[previous.length - 1];
      segments.push({
        // startId: full fill-up whose fuel was burned (the consumption is shown on it).
        // endId: full fill-up that closes the trip and measures the litres used.
        startId: start.id,
        startDate: start.date,
        endId: f.id,
        date: f.date,
        litres,
        km,
        // Cost of the burned fuel, at the price paid for it.
        cost: litres * sum(burned, fillTotal) / burnedLitres,
        l100: litres / km * 100,
        ethanol: sum(burned, x => fillLitres(x) * fillEthanol(x)) / burnedLitres,
        family: fillFamily(f),
        groupKey: group.key,
        groupLabel: group.label,
        count: pending.length,
      });
    }
    previous = pending;
    pending = [];
  }
  return segments;
}

function groupSegments(segments) {
  const groups = {};
  for (const s of segments) {
    const g = groups[s.groupKey] || (groups[s.groupKey] = {
      key: s.groupKey, label: s.groupLabel, litres: 0, km: 0, cost: 0, ethanolLitres: 0, count: 0,
    });
    g.litres += s.litres; g.km += s.km; g.cost += s.cost; g.ethanolLitres += s.ethanol * s.litres; g.count++;
  }
  return Object.values(groups)
    .map(g => ({ ...g, l100: g.litres / g.km * 100, costPerKm: g.cost / g.km, ethanol: g.ethanolLitres / g.litres }))
    .sort((a, b) => a.l100 - b.l100);
}

const monthKey = date => date.slice(0, 7);

function shiftMonth(key, delta) {
  let [y, m] = key.split('-').map(Number);
  m += delta;
  while (m < 1) { m += 12; y--; }
  while (m > 12) { m -= 12; y++; }
  return `${y}-${String(m).padStart(2, '0')}`;
}

// Adds n months to an ISO date; January 31 + 1 month gives February 28 (or 29).
function addMonths(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  const total = (m - 1) + n;
  const year = y + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12 + 1;
  const day = Math.min(d, new Date(year, month, 0).getDate());
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Payments of an expense up to today (or its end date). A one-off expense has
// a single payment: itself.
function occurrences(e, today) {
  if (!e.recurrence) return [e];
  const step = RECURRENCES[e.recurrence].months;
  const last = e.endDate && e.endDate < today ? e.endDate : today;
  const list = [];
  for (let k = 0; ; k++) {
    const date = addMonths(e.date, k * step);
    if (date > last) break;
    list.push({ ...e, date, seriesId: e.id });
  }
  return list;
}

const expandExpenses = (expenses, today) => expenses.flatMap(e => occurrences(e, today));

// Recurring expenses still active, as a monthly amount.
function recurringMonthly(expenses, today) {
  return sum(expenses.filter(e => e.recurrence && e.date <= today && (!e.endDate || e.endDate >= today)),
    e => e.amount / RECURRENCES[e.recurrence].months);
}

function monthlyTotals(fills, expenses) {
  const months = {};
  const get = k => months[k] || (months[k] = { month: k, fuel: 0, expenses: 0, km: 0, litres: 0 });
  for (const f of fills) {
    const m = get(monthKey(f.date));
    m.fuel += fillTotal(f);
    m.km += f.distance;
    m.litres += fillLitres(f);
  }
  for (const e of expenses) get(monthKey(e.date)).expenses += e.amount;
  return Object.values(months).sort((a, b) => (a.month < b.month ? -1 : 1));
}

// Average over the last 3 complete months (current month excluded) since the
// first data. Active recurring expenses count as their monthly equivalent (a
// yearly insurance does not skew the average), one-off expenses as their
// average. Returns null when no complete month is available.
function forecast(fills, expenses, today) {
  const dates = [...fills, ...expenses].map(x => x.date).sort();
  if (!dates.length) return null;
  // A first month that does not start on the 1st is incomplete: it would lower the average.
  const firstKey = dates[0].endsWith('-01') ? monthKey(dates[0]) : shiftMonth(monthKey(dates[0]), 1);
  const keys = [1, 2, 3].map(d => shiftMonth(monthKey(today), -d)).filter(k => k >= firstKey);
  if (!keys.length) return null;
  const oneOff = expenses.filter(e => !e.recurrence);
  const byMonth = Object.fromEntries(monthlyTotals(fills, oneOff).map(m => [m.month, m]));
  const avg = field => sum(keys, k => byMonth[k]?.[field] || 0) / keys.length;
  const fuel = avg('fuel');
  const exp = avg('expenses') + recurringMonthly(expenses, today);
  return {
    months: keys.length,
    monthlyFuel: fuel,
    monthlyExpenses: exp,
    monthlyKm: avg('km'),
    yearlyTotal: (fuel + exp) * 12,
  };
}

// Usual price difference (per litre) from the base fuel of the family (E10 or
// regular for petrol, diesel for diesel). Only used to estimate the price of a
// fuel never bought, so that it still appears in the simulator.
const PRICE_OFFSETS = {
  E5: 0.05, E10: 0, SP95P: 0.12, SP98: 0.08, SP98P: 0.18, REG: 0, MID: 0.1, PREM: 0.2, E85: -0.95,
  B7: 0, B7P: 0.10,
};

// Estimated prices of the `keys` fuels with no known price, from the known
// prices of the same family (average of the base price estimates). E85 does not
// follow petrol prices: it is only used as a reference if it is the only price.
function estimatePrices(known, keys) {
  const estimates = {};
  for (const k of keys) {
    if (known[k] > 0) continue;
    let refs = Object.keys(known).filter(r => known[r] > 0 && FUELS[r].family === FUELS[k].family);
    if (refs.some(r => r !== 'E85')) refs = refs.filter(r => r !== 'E85');
    if (!refs.length) continue;
    const base = sum(refs, r => known[r] - PRICE_OFFSETS[r]) / refs.length;
    const price = base + PRICE_OFFSETS[k];
    if (price > 0) estimates[k] = price;
  }
  return estimates;
}

// Last price per litre paid for each fuel.
function lastPrices(fills) {
  const prices = {};
  for (const f of sortFills(fills)) for (const p of f.parts) prices[p.fuel] = p.total / p.litres;
  return prices;
}

function mainFamily(fills) {
  const byFamily = {};
  for (const f of fills) byFamily[fillFamily(f)] = (byFamily[fillFamily(f)] || 0) + fillLitres(f);
  const keys = Object.keys(byFamily);
  return keys.length ? keys.sort((a, b) => byFamily[b] - byFamily[a])[0] : 'essence';
}

// Ranks the fuels of the car's family by cost per 100 km, from the measured
// consumption (or estimated from the ethanol content if never measured).
// prices: { E10: 1.79, E85: 0.82, ... } per litre; only prices > 0 are compared.
function simulate(fills, prices, family = mainFamily(fills)) {
  const segments = computeSegments(fills).filter(s => s.family === family);
  if (!segments.length) return null;

  const groupList = groupSegments(segments);
  const groups = Object.fromEntries(groupList.map(g => [g.key, g]));
  // Never measured: start from the measured group with the closest ethanol content.
  const conso = (key, ethanol) => {
    if (groups[key]) return { l100: groups[key].l100, estimated: false };
    const ref = groupList.reduce((a, b) => (Math.abs(b.ethanol - ethanol) < Math.abs(a.ethanol - ethanol) ? b : a));
    return { l100: ref.l100 * (1 + ETHANOL_OVERCONSUMPTION * (ethanol - ref.ethanol)), estimated: true };
  };

  const candidates = FUEL_ORDER
    .filter(k => FUELS[k].family === family && prices[k] > 0)
    .map(k => ({ key: k, label: FUELS[k].label, price: prices[k], ...conso(k, FUELS[k].ethanol) }));

  if (family === 'essence' && prices.E10 > 0 && prices.E85 > 0) {
    const ethanol = (FUELS.E10.ethanol + FUELS.E85.ethanol) / 2;
    candidates.push({
      key: 'E10+E85', label: `${FUELS.E10.label} + ${FUELS.E85.label}`, mix: '50/50',
      price: (prices.E10 + prices.E85) / 2, ...conso('E10+E85', ethanol),
    });
  }

  const rows = candidates
    .map(c => ({ ...c, per100: c.l100 * c.price }))
    .sort((a, b) => a.per100 - b.per100);

  // E85 price below which it beats the best fuel without E85.
  let e85BreakEven = null;
  const e85 = rows.find(r => r.key === 'E85');
  const bestOther = rows.find(r => r.key !== 'E85' && r.key !== 'E10+E85');
  if (e85 && bestOther) e85BreakEven = { price: bestOther.per100 / e85.l100, versus: bestOther.label };

  return { family, rows, e85BreakEven };
}

// today: today's ISO date; since: start of the period, or null for the whole history.
function computeStats(fills, expenses, today, since) {
  const inPeriod = x => !since || x.date >= since;
  const allSorted = sortFills(fills);
  // Segments are computed on the whole history to keep the partial fill-ups at
  // the start of the period, then filtered on their end date.
  const segments = computeSegments(allSorted).filter(inPeriod);
  const sorted = allSorted.filter(inPeriod);
  const exps = expandExpenses(expenses, today).filter(inPeriod);

  const totalCost = sum(sorted, fillTotal);
  const totalLitres = sum(sorted, fillLitres);
  const totalKm = sum(sorted, f => f.distance);
  const totalExpenses = sum(exps, e => e.amount);
  const segLitres = sum(segments, s => s.litres);
  const segKm = sum(segments, s => s.km);
  // Fuel cost per km over the measured trips only: the reference fill-up and the
  // latest one (still in the tank) would distort a "spent / driven" ratio.
  const fuelPerKm = segKm ? sum(segments, s => s.cost) / segKm : null;
  const l100s = segments.map(s => s.l100);

  const fuels = FUEL_ORDER.map(key => {
    const parts = sorted.flatMap(f => f.parts.filter(p => p.fuel === key));
    const litres = sum(parts, p => p.litres);
    const cost = sum(parts, p => p.total);
    return { key, label: FUELS[key].label, litres, cost, price: litres ? cost / litres : 0 };
  }).filter(x => x.litres > 0);

  const categories = Object.entries(EXPENSE_CATEGORIES).map(([key, label]) => {
    const items = exps.filter(e => e.category === key);
    return { key, label, count: items.length, amount: sum(items, e => e.amount) };
  }).filter(c => c.count > 0).sort((a, b) => b.amount - a.amount);

  return {
    count: sorted.length,
    segments,
    totalCost, totalLitres, totalKm, totalExpenses,
    avgL100: segKm ? segLitres / segKm * 100 : null,
    lastL100: l100s.length ? l100s[l100s.length - 1] : null,
    minL100: l100s.length ? Math.min(...l100s) : null,
    maxL100: l100s.length ? Math.max(...l100s) : null,
    avgPrice: totalLitres ? totalCost / totalLitres : null,
    costPerKm: fuelPerKm,
    totalPerKm: fuelPerKm != null && totalKm ? fuelPerKm + totalExpenses / totalKm : null,
    groups: groupSegments(segments),
    fuels,
    categories,
    monthly: monthlyTotals(sorted, exps),
    pricePoints: sorted.map(f => ({ date: f.date, price: fillPricePerLitre(f) })),
    forecast: forecast(allSorted, expenses, today),
  };
}
