// "Simulator" tab: which fuel is cheapest per 100 km (or 100 miles).

// Prices typed during the session; otherwise the last price paid; otherwise a
// price estimated from the prices paid for the other fuels. Prices are typed
// per litre or per gallon (volume unit setting).
let simPrices = {};
let simPricesUnit = null;

function renderSimulator() {
  if (simPricesUnit !== volUnit()) { simPrices = {}; simPricesUnit = volUnit(); }
  const fuels = visibleFuels(activeVehicle());
  const paid = lastPrices(curFills());
  const estimated = estimatePrices(paid, fuels);
  $('#sim-prices').innerHTML = fuels.map(k => {
    const known = paid[k] || estimated[k];
    const value = simPrices[k] ?? (known ? numToInput(pricePerVol(known).toFixed(3)) : '');
    const tag = simPrices[k] == null && !paid[k] && estimated[k] ? ` <span class="tag">${t('sim.priceEstimated')}</span>` : '';
    return `<label class="field"><span>${fuelHTML(FUELS[k].label)}${tag}</span>
      <div class="suffix"><input type="text" inputmode="decimal" data-fuel="${k}" value="${escapeHTML(value)}" placeholder="—"><em>${escapeHTML(currencySymbol())}/${volUnit()}</em></div>
    </label>`;
  }).join('');
  renderSimResult();
}

$('#sim-prices').addEventListener('input', e => {
  const k = e.target.dataset.fuel;
  if (!k) return;
  simPrices[k] = e.target.value;
  e.target.closest('.field').querySelector('.tag')?.remove();
  renderSimResult();
});

function renderSimResult() {
  // Prices per litre for the calculation.
  const prices = {};
  const guessed = new Set();
  $('#sim-prices').querySelectorAll('input').forEach(i => {
    prices[i.dataset.fuel] = parseNum(i.value) / toL(1);
    if (i.closest('.field').querySelector('.tag')) guessed.add(i.dataset.fuel);
  });
  const priceGuessed = key => key.split('+').some(k => guessed.has(k));
  const sim = simulate(curFills(), prices, activeVehicle().family);
  const el = $('#sim-result');
  if (!sim) { el.innerHTML = `<div class="empty">${t('sim.needFills')}</div>`; return; }
  if (!sim.rows.length) { el.innerHTML = `<div class="empty">${t('sim.needPrice')}</div>`; return; }

  // "E10 + E85 (50/50)" outside the table, where 50/50 becomes a note.
  const simName = r => r.mix ? `${r.label} (${r.mix})` : r.label;
  const best = sim.rows[0];
  const worst = sim.rows[sim.rows.length - 1];
  const estimatedTag = key => ` <span class="tag">${t(key)}</span>`;

  const winner = sim.rows.length > 1 ? `
    <div class="winner">
      <div><div class="label">${t('sim.cheapest')}</div><strong>${fuelHTML(simName(best))}</strong></div>
      <div class="price">${t('sim.per100', { unit: distUnit() })}<b>${money(per100(best.per100 / 100))}</b></div>
    </div>` : '';

  const table = `<div class="table-wrap"><table>
    <thead><tr><th>${t('th.fuel')}</th><th>${t('th.conso')}</th><th>${t('th.price')}/${volUnit()}</th><th>${per100Label()}</th></tr></thead>
    <tbody>${sim.rows.map((r, i) => `<tr>
      <td>${fuelHTML(r.label)}${r.mix ? ` <span class="tag">${t('sim.mix', { mix: r.mix })}</span>` : ''}</td>
      <td>${fmtConsoNum(r.l100)} ${consoFormat().short}${r.estimated ? estimatedTag('sim.consoEstimated') : ''}</td>
      <td>${fmtPrice(r.price)}${priceGuessed(r.key) ? estimatedTag('sim.priceEstimated') : ''}</td>
      <td class="${i === 0 && sim.rows.length > 1 ? 'best' : ''}">${money(per100(r.per100 / 100))}${i ? ` <span class="tag">+${fmt(per100((r.per100 - best.per100) / 100))}</span>` : ''}</td>
    </tr>`).join('')}</tbody></table></div>`;

  const lines = [];
  if (sim.rows.length > 1) {
    lines.push(t('sim.saving', {
      amount: money(per100((worst.per100 - best.per100) / 100)), unit: distUnit(), name: fuelHTML(simName(worst)),
    }));
  }
  if (sim.e85BreakEven) {
    lines.push(t('sim.breakEven', {
      price: `${fmtPrice(sim.e85BreakEven.price)}/${volUnit()}`, name: fuelHTML(sim.e85BreakEven.versus),
    }));
  }
  if (sim.rows.some(r => priceGuessed(r.key))) lines.push(`<span class="tag">${t('sim.notePrice')}</span>`);
  if (sim.rows.some(r => r.estimated)) lines.push(`<span class="tag">${t('sim.noteConso')}</span>`);

  el.innerHTML = `${winner}<div class="panel"><h3 class="panel-title">${t('sim.ranking')}</h3>${table}
    ${lines.map(l => `<p class="verdict">${l}</p>`).join('')}</div>`;
}
