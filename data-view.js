// Settings › Data: summary, backup / restore, Excel exports, erase.

const BACKUP_KEY = 'conso-carbu:last-backup';
const BACKUP_REMINDER_DAYS = 30;

function lastBackup() {
  try { return localStorage.getItem(BACKUP_KEY); } catch { return null; }
}

const daysSince = iso => Math.floor((Date.parse(todayISO()) - Date.parse(iso)) / 86400000);

// Discreet reminder on the settings icon when data was never (or not recently) backed up.
function backupNeeded() {
  if (IS_APP) return false; // the Android app is covered by the automatic backup
  if (!fills.length && !expenses.length) return false;
  const last = lastBackup();
  return !last || daysSince(last) >= BACKUP_REMINDER_DAYS;
}

function updateBackupDot() {
  $('#backup-dot').hidden = !backupNeeded();
}

function renderData() {
  $('#data-summary').innerHTML = `
    <div><strong>${vehicles.length}</strong><span>${tn('summary.vehicles', vehicles.length)}</span></div>
    <div><strong>${fills.length}</strong><span>${tn('summary.fills', fills.length)}</span></div>
    <div><strong>${expenses.length}</strong><span>${tn('summary.expenses', expenses.length)}</span></div>`;

  const last = lastBackup();
  const status = $('#backup-status');
  if (!last) {
    status.className = `backup-status${fills.length || expenses.length ? ' warn' : ''}`;
    status.textContent = t('backup.none');
  } else {
    const days = daysSince(last);
    const when = days === 0 ? t('backup.today') : days === 1 ? t('backup.yesterday') : t('backup.daysAgo', { n: days });
    status.className = `backup-status ${days >= BACKUP_REMINDER_DAYS ? 'warn' : 'ok'}`;
    status.textContent = t('backup.last', { when, date: fmtDate(last) });
  }

  const empty = !fills.length && !expenses.length;
  $('#export-csv').disabled = !fills.length;
  $('#export-expenses-csv').disabled = !expenses.length;
  $('#clear-all').disabled = empty;
  updateBackupDot();
}

// After a restore or an erase, every screen starts again from scratch.
function afterDataChange(message) {
  ({ fills, expenses, vehicles, settings } = normalize({ fills, expenses, vehicles, settings }));
  persist();
  renderVehicleSwitch();
  resetForm();
  resetExpenseForm();
  renderSettings();
  toast(message);
}

$('#export-json').addEventListener('click', () => {
  Storage.download(`${t('file.backup')}-${todayISO()}.json`, Storage.toJSON({ fills, expenses, vehicles }), 'application/json');
  markBackupDone();
  if (!IS_APP) toast(t('backup.downloaded'));
});

$('#export-csv').addEventListener('click', () => {
  Storage.download(`${t('file.fills')}-${todayISO()}.csv`, Storage.fillsToCSV(fills, vehicles), 'text/csv;charset=utf-8');
});

$('#export-expenses-csv').addEventListener('click', () => {
  Storage.download(`${t('file.expenses')}-${todayISO()}.csv`, Storage.expensesToCSV(expenses, vehicles, todayISO()), 'text/csv;charset=utf-8');
});

// Restores the content of a backup file after confirmation.
function confirmAndRestore(text) {
  let data;
  try {
    data = Storage.parseImport(text);
  } catch (err) {
    alert(t('restore.error', { msg: err.message }));
    return;
  }

  const counts = {
    fills: tn('count.fills', data.fills.length),
    expenses: tn('count.expenses', data.expenses.length),
  };
  if (data.vehicles) {
    // Full backup: it replaces everything.
    if (!confirm(t('restore.confirmFull', { vehicles: tn('count.vehicles', data.vehicles.length), ...counts }))) return;
    ({ fills, expenses, vehicles } = data);
  } else {
    // Old backup without vehicles: it replaces the active vehicle's data.
    const v = activeVehicle();
    if (!confirm(t('restore.confirmOld', { name: v.name, ...counts }))) return;
    const tag = x => ({ ...x, vehicleId: v.id });
    fills = [...fills.filter(f => f.vehicleId !== v.id), ...data.fills.map(tag)];
    expenses = [...expenses.filter(x => x.vehicleId !== v.id), ...data.expenses.map(tag)];
  }
  afterDataChange(t('restore.done'));
}

$('#import-json').addEventListener('click', () => $('#import-file').click());

$('#import-file').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (file) confirmAndRestore(await file.text());
});

function markBackupDone() {
  try { localStorage.setItem(BACKUP_KEY, todayISO()); } catch {}
  if (currentTab === 'settings') renderData();
  else updateBackupDot();
}

$('#clear-all').addEventListener('click', () => {
  if (!confirm(t('clear.confirm'))) return;
  fills = [];
  expenses = [];
  afterDataChange(t('clear.done'));
});

updateBackupDot();
