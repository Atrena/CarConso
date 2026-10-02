// "Stats" tab: period filter, key figures, charts, forecast.

const PERIOD_KEY = 'conso-carbu:period';
let period = (() => { try { return localStorage.getItem(PERIOD_KEY) || 'all'; } catch { return 'all'; } })();

function periodStart() {
  // addMonths caps at month end (March 31 − 1 month = February 28, not March 3).
  return period === 'all' ? null : addMonths(todayISO(), -Number(period));
}

$('#period').addEventListener('click', e => {
  const btn = e.target.closest('button[data-period]');
  if (!btn) return;
  period = btn.dataset.period;
  try { localStorage.setItem(PERIOD_KEY, period); } catch {}
  renderStats();
});

/* ---------- Charts ---------- */

const charts = {};

const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function drawChart(id, { type, data, options, legend = false, beginAtZero = false }) {
  charts[id]?.destroy();
  if (typeof Chart === 'undefined') return;
  const text2 = cssVar('--text-2');
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  Chart.defaults.font.size = Math.round(12 * (parseFloat(cssVar('--fs')) || 1)); // chosen text size
  Chart.defaults.locale = LOCALE;
  charts[id] = new Chart($(id), {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: legend, labels: { color: text2, boxWidth: 12, boxHeight: 12 } } },
      scales: {
        x: { ticks: { color: text2, maxRotation: 0, autoSkip: true }, grid: { display: false } },
        y: { ticks: { color: text2 }, grid: { color: cssVar('--grid') }, border: { display: false }, beginAtZero },
      },
      ...options,
    },
  });
}

const lineDataset = (label, data, color) => ({
  label, data, borderColor: color, backgroundColor: color,
  tension: 0.3, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2,
});

// Consumption in the chosen unit, rounded for the charts.
const chartConso = l100 => +consoValue(l100).toFixed(consoFormat().digits);
// Cost per km → cost per mile if needed.
const fromKmCost = costPerKm => costPerKm * toKm(1);

function card(label, value, sub = '') {
  return `<div class="card"><span>${label}</span><strong>${value}</strong>${sub ? `<small>${sub}</small>` : ''}</div>`;
}

/* ---------- Rendering ---------- */

function renderStats() {
  document.querySelectorAll('#period button').forEach(b => b.setAttribute('aria-checked', b.dataset.period === period));
  $('#price-chart-title').textContent = t('stats.priceChart', { per: perVolLabel() });

  const s = computeStats(curFills(), curExpenses(), todayISO(), periodStart());
  const tank = activeVehicle().tank;
  const hasFuel = s.segments.length > 0;
  $('#stats-empty').hidden = hasFuel;
  $('#stats-content').hidden = !hasFuel;
  $('#money-content').hidden = !s.monthly.length;

  const accent = cssVar('--accent');
  const accent2 = cssVar('--series-2');
  const text2 = cssVar('--text-2');

  if (hasFuel) {
    $('#hero').innerHTML = `
      <div>
        <div class="label">${t('stats.avg')}</div>
        <div class="big">${fmtConsoNum(s.avgL100)} <small>${consoFormat().unit}</small></div>
        ${tank ? `<div class="label autonomy">${t('stats.autonomy', { dist: fmtDist(tank / s.avgL100 * 100), tank: fmtVol(tank, 0) })}</div>` : ''}
      </div>
      <div class="side">
        <div><span>${t('stats.last')}</span><strong>${fmtConsoNum(s.lastL100)}</strong></div>
        <div><span>${t('stats.best')}</span><strong>${fmtConsoNum(s.minL100)}</strong></div>
        <div><span>${t('stats.worst')}</span><strong>${fmtConsoNum(s.maxL100)}</strong></div>
      </div>`;

    const unit = t(distUnit() === 'mi' ? 'unit.mile' : 'unit.km');
    $('#cards').innerHTML = [
      card(t('card.avgPrice'), fmtPrice(s.avgPrice), perVolLabel()),
      card(t('card.fuelPer', { unit }), money(fromKmCost(s.costPerKm), 3), `${money(per100(s.costPerKm))} ${per100Label()}`),
      card(t('card.totalPer', { unit }), money(fromKmCost(s.totalPerKm), 3), t('card.fuelAndExpenses')),
      card(t('card.distance'), fmtDist(s.totalKm), t('card.used', { volume: fmtVol(s.totalLitres, 0) })),
      card(t('card.fuel'), money(s.totalCost, 0), tn('count.fills', s.count)),
      card(t('card.expenses'), money(s.totalExpenses, 0), t('card.expensesSub')),
    ].join('');

    drawChart('#chart-l100', {
      type: 'line',
      data: {
        labels: s.segments.map(x => fmtDate(x.startDate)),
        datasets: [lineDataset(consoFormat().unit, s.segments.map(x => chartConso(x.l100)), accent)],
      },
    });

    // The fuel / blend with the lowest cost per km is highlighted.
    const bestCost = Math.min(...s.groups.map(g => g.costPerKm));
    $('#group-table').innerHTML = `
      <thead><tr><th>${t('th.fuel')}</th><th>${t('th.conso')}</th><th>${per100Label()}</th><th>${t('th.fills')}</th></tr></thead>
      <tbody>${s.groups.map(g => `<tr>
        <td>${fuelHTML(g.label)}</td>
        <td>${fmtConsoNum(g.l100)} ${consoFormat().short}</td>
        <td class="${s.groups.length > 1 && g.costPerKm === bestCost ? 'best' : ''}">${money(per100(g.costPerKm))}</td>
        <td>${g.count}</td>
      </tr>`).join('')}</tbody>`;

    drawChart('#chart-groups', {
      type: 'bar',
      legend: true,
      data: {
        // One line per fuel ("SP-95 E10" / "+ E85"): long names fit a phone without slanting.
        labels: s.groups.map(g => g.key.split('+').map((k, i) => (i ? '+ ' : '') + FUELS[k].label)),
        datasets: [
          { label: consoFormat().unit, data: s.groups.map(g => chartConso(g.l100)), backgroundColor: accent, yAxisID: 'y', borderRadius: 6 },
          { label: `${currencySymbol()} ${per100Label()}`, data: s.groups.map(g => +per100(g.costPerKm).toFixed(2)), backgroundColor: accent2, yAxisID: 'y1', borderRadius: 6 },
        ],
      },
      options: {
        scales: {
          x: { ticks: { color: text2, maxRotation: 0, autoSkip: false }, grid: { display: false } },
          y: { position: 'left', beginAtZero: true, ticks: { color: accent }, grid: { color: cssVar('--grid') }, border: { display: false } },
          y1: { position: 'right', beginAtZero: true, ticks: { color: accent2 }, grid: { display: false }, border: { display: false } },
        },
      },
    });

    $('#fuel-table').innerHTML = `
      <thead><tr><th>${t('th.fuel')}</th><th>${t(`fill.volume.${volUnit()}`)}</th><th>${t('th.spent')}</th><th>${t('th.avgPrice')}</th></tr></thead>
      <tbody>${s.fuels.map(f => `<tr>
        <td>${fuelHTML(f.label)}</td><td>${fmtVol(f.litres, 1)}</td><td>${money(f.cost)}</td><td>${fmtPrice(f.price)}</td>
      </tr>`).join('')}</tbody>`;

    drawChart('#chart-price', {
      type: 'line',
      data: {
        labels: s.pricePoints.map(p => fmtDate(p.date)),
        datasets: [lineDataset(`${currencySymbol()}/${volUnit()}`, s.pricePoints.map(p => +pricePerVol(p.price).toFixed(3)), accent2)],
      },
    });
  }

  if (s.monthly.length) {
    drawChart('#chart-monthly', {
      type: 'bar',
      legend: true,
      data: {
        labels: s.monthly.map(m => fmtMonth(m.month)),
        datasets: [
          { label: t('chart.fuel'), data: s.monthly.map(m => +m.fuel.toFixed(2)), backgroundColor: accent, borderRadius: 4 },
          { label: t('chart.expenses'), data: s.monthly.map(m => +m.expenses.toFixed(2)), backgroundColor: accent2, borderRadius: 4 },
        ],
      },
      options: {
        scales: {
          x: { stacked: true, ticks: { color: text2, maxRotation: 0, autoSkip: true }, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, ticks: { color: text2 }, grid: { color: cssVar('--grid') }, border: { display: false } },
        },
      },
    });

    $('#category-table').innerHTML = s.categories.length
      ? `<thead><tr><th>${t('th.category')}</th><th>${t('th.count')}</th><th>${t('th.total')}</th></tr></thead>
         <tbody>${s.categories.map(c => `<tr><td>${c.label}</td><td>${c.count}</td><td>${money(c.amount)}</td></tr>`).join('')}</tbody>`
      : `<tbody><tr><td>${t('stats.noExpense')}</td></tr></tbody>`;
  }

  const fc = s.forecast;
  $('#forecast').innerHTML = fc
    ? [
        card(t('fc.fuel'), money(fc.monthlyFuel, 0), tn('fc.months', fc.months)),
        card(t('fc.expenses'), money(fc.monthlyExpenses, 0), t('fc.inclRecurring')),
        card(t(distUnit() === 'mi' ? 'fc.mi' : 'fc.km'), fmtDist(fc.monthlyKm)),
        card(t('fc.budget'), money(fc.yearlyTotal, 0), t('card.fuelAndExpenses')),
      ].join('')
    : `<div class="empty">${t('fc.empty')}</div>`;
}

// Redraws the charts when the system theme changes.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ($('#tab-stats').classList.contains('active')) renderStats();
});
