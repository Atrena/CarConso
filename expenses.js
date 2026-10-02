// "Expenses" tab: service, insurance, tolls… one-off or recurring.

let editingExpenseId = null;

// Category and recurrence lists, rebuilt when the language changes.
function fillExpenseOptions() {
  const category = $('#e-category').value;
  const recurrence = $('#e-recurrence').value;
  $('#e-category').innerHTML = Object.entries(EXPENSE_CATEGORIES)
    .map(([k, label]) => `<option value="${k}">${label}</option>`).join('');
  $('#e-recurrence').innerHTML = `<option value="">${t('exp.none')}</option>`
    + Object.entries(RECURRENCES).map(([k, r]) => `<option value="${k}">${r.label}</option>`).join('');
  if (category) $('#e-category').value = category;
  $('#e-recurrence').value = recurrence;
}

// Next payment after today, or null when the series is over.
function nextOccurrence(e, today) {
  const step = RECURRENCES[e.recurrence].months;
  for (let k = 0; ; k++) {
    const date = addMonths(e.date, k * step);
    if (e.endDate && date > e.endDate) return null;
    if (date > today) return date;
  }
}

function syncRecurrenceFields() {
  const rec = $('#e-recurrence').value;
  $('#e-end-field').hidden = !rec;
  const date = $('#e-date').value;
  $('#recurrence-hint').textContent = rec && date ? t('exp.recHint', { rec: RECURRENCES[rec].label, date: fmtDate(date) }) : '';
}

$('#e-recurrence').addEventListener('change', syncRecurrenceFields);
$('#e-date').addEventListener('change', syncRecurrenceFields);

function setExpenseMode(editing) {
  $('#expense-title').textContent = t(editing ? 'exp.edit' : 'exp.new');
  $('#expense-submit').textContent = t(editing ? 'common.update' : 'common.add');
  $('#expense-cancel').hidden = !editing;
  $('#expense-delete').hidden = !editing;
  $('#expense-error').textContent = '';
}

function resetExpenseForm() {
  editingExpenseId = null;
  $('#expense-form').reset();
  $('#e-date').value = todayISO();
  setExpenseMode(false);
  syncRecurrenceFields();
}

function startExpenseEdit(id) {
  const e = expenses.find(x => x.id === id);
  if (!e) return;
  editingExpenseId = id;
  $('#e-date').value = e.date;
  $('#e-category').value = e.category;
  $('#e-amount').value = numToInput(e.amount);
  $('#e-note').value = e.note || '';
  $('#e-recurrence').value = e.recurrence || '';
  $('#e-end').value = e.endDate || '';
  setExpenseMode(true);
  syncRecurrenceFields();
  window.scrollTo(0, 0);
}

function expenseItem(e, today) {
  let amount = money(e.amount);
  // Recurring: the category is already the title, the badge shows the frequency.
  const badges = [e.recurrence
    ? `<span class="badge">${RECURRENCES[e.recurrence].short}</span>`
    : `<span class="badge">${EXPENSE_CATEGORIES[e.category]}</span>`];
  const meta = [];
  if (e.recurrence) {
    amount += ` <small>${RECURRENCES[e.recurrence].per}</small>`;
    const done = occurrences(e, today);
    const next = nextOccurrence(e, today);
    meta.push(e.endDate
      ? t('exp.sinceUntil', { date: fmtDate(e.date), end: fmtDate(e.endDate) })
      : t('exp.since', { date: fmtDate(e.date) }));
    meta.push(tn('exp.payments', done.length, { amount: money(done.length * e.amount) }));
    meta.push(next ? t('exp.next', { date: fmtDate(next) }) : t('exp.ended'));
  }
  if (e.note) meta.push(escapeHTML(e.note));
  return `<li><button type="button" data-id="${e.id}">
      <span class="h-date">${e.recurrence ? EXPENSE_CATEGORIES[e.category] : fmtDate(e.date)}</span>
      <span class="h-l100">${amount}</span>
      <span class="badges">${badges.join('')}</span>
      ${meta.length ? `<span class="h-meta">${meta.join(' · ')}</span>` : ''}
    </button></li>`;
}

function renderExpenses() {
  const list = $('#expenses');
  const own = curExpenses();
  if (!own.length) {
    list.innerHTML = `<li class="empty">${t('exp.empty')}</li>`;
    return;
  }
  const today = todayISO();
  const byDateDesc = (a, b) =>
    a.date === b.date ? (b.createdAt || 0) - (a.createdAt || 0) : a.date < b.date ? 1 : -1;
  const recurring = own.filter(e => e.recurrence).sort(byDateDesc);
  const oneOff = own.filter(e => !e.recurrence).sort(byDateDesc);
  list.innerHTML = [
    recurring.length ? `<li class="list-title">${t('exp.recurring')}</li>` : '',
    ...recurring.map(e => expenseItem(e, today)),
    recurring.length && oneOff.length ? `<li class="list-title">${t('exp.oneOff')}</li>` : '',
    ...oneOff.map(e => expenseItem(e, today)),
  ].join('');
}

$('#expenses').addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (btn) startExpenseEdit(btn.dataset.id);
});

$('#expense-form').addEventListener('submit', ev => {
  ev.preventDefault();
  const date = $('#e-date').value;
  const amount = parseNum($('#e-amount').value);
  const recurrence = $('#e-recurrence').value || null;
  const endDate = recurrence ? $('#e-end').value || null : null;
  const error = msg => { $('#expense-error').textContent = msg; };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return error(t('exp.errDate'));
  if (!(amount > 0)) return error(t('exp.errAmount'));
  if (endDate && endDate < date) return error(t('exp.errEnd'));
  const data = { date, category: $('#e-category').value, amount, note: $('#e-note').value.trim() || null, recurrence, endDate };

  const wasEdit = !!editingExpenseId;
  if (wasEdit) Object.assign(expenses.find(x => x.id === editingExpenseId), data);
  else expenses.push({ id: newId(), vehicleId: settings.activeVehicleId, createdAt: Date.now(), ...data });
  persist();
  resetExpenseForm();
  renderExpenses();
  toast(wasEdit ? t('exp.updated')
    : recurrence ? t('exp.addedRec', { amount: money(amount), per: RECURRENCES[recurrence].per })
    : t('exp.added', { amount: money(amount) }));
});

$('#expense-cancel').addEventListener('click', resetExpenseForm);
$('#expense-delete').addEventListener('click', () => {
  const e = expenses.find(x => x.id === editingExpenseId);
  if (!e) return;
  if (!confirm(t(e.recurrence ? 'exp.confirmDeleteRec' : 'exp.confirmDelete'))) return;
  expenses = expenses.filter(x => x.id !== editingExpenseId);
  persist();
  resetExpenseForm();
  renderExpenses();
  toast(t('exp.deleted'));
});

fillExpenseOptions();
resetExpenseForm();
