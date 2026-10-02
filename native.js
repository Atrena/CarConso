// Android layer (Capacitor app). On the website IS_APP is false and nothing else
// runs. Capacitor plugins are used through Capacitor.Plugins, with no bundler.

const IS_APP = !!window.Capacitor?.isNativePlatform?.();

if (IS_APP) {
  document.documentElement.classList.add('is-app');
  const { Preferences, Filesystem, Share, App, Browser } = Capacitor.Plugins;

  /* ---------- Automatic Android backup ---------- */
  // Android preferences are part of the phone's Google backup: a copy of the
  // data is kept there on every save. After a reinstall (or on a new phone),
  // the copy restored by Android is copied back into the app on first launch.
  const MIRROR_KEY = 'carconso-data';
  // First launch: local storage is empty. The copy must not be overwritten
  // before checking whether Android restored one.
  let restoreChecked = localStorage.getItem(STORAGE_KEYS.vehicles) !== null;
  let mirrorTimer;

  function mirror() {
    if (!restoreChecked) return;
    clearTimeout(mirrorTimer);
    mirrorTimer = setTimeout(() => {
      const data = {};
      for (const [name, key] of Object.entries(STORAGE_KEYS)) data[name] = localStorage.getItem(key);
      Preferences.set({ key: MIRROR_KEY, value: JSON.stringify(data) }).catch(() => {});
    }, 500);
  }

  const save = Storage.save;
  Storage.save = data => {
    const ok = save.call(Storage, data);
    if (ok) mirror();
    return ok;
  };

  if (!restoreChecked) {
    Preferences.get({ key: MIRROR_KEY }).then(({ value }) => {
      let data = null;
      try { data = JSON.parse(value); } catch {}
      if (data?.vehicles) {
        for (const [name, key] of Object.entries(STORAGE_KEYS)) if (data[name] != null) localStorage.setItem(key, data[name]);
        location.reload();
        return;
      }
      restoreChecked = true;
      mirror();
    }).catch(() => { restoreChecked = true; });
  }

  // Data saved before this version is copied once.
  document.addEventListener('DOMContentLoaded', mirror);

  /* ---------- Exports: Android share sheet ---------- */
  // A download link does not work in the app: the file is written to the
  // cache, then offered through the share sheet (Drive, Files, email…).
  Storage.download = async (filename, content) => {
    try {
      const { uri } = await Filesystem.writeFile({ path: filename, data: content, directory: 'CACHE', encoding: 'utf8' });
      await Share.share({ title: filename, files: [uri], dialogTitle: t('export.dialog') });
    } catch (err) {
      // Closing the share sheet without choosing is not an error.
      if (!/cancel/i.test(err?.message || '')) toast(t('export.error', { msg: err?.message || t('common.unknownError') }));
    }
  };

  /* ---------- External links: phone browser ---------- */
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="http"]');
    if (!link) return;
    e.preventDefault();
    Browser.open({ url: link.href });
  });

  /* ---------- Android back button ---------- */
  // Cancels an edit in progress first, then goes back to the start screen;
  // only exits the app from there.
  App.addListener('backButton', () => {
    if (currentTab === 'add' && editingId) { resetForm(); showTab('history'); return; }
    if (currentTab === 'expenses' && editingExpenseId) { resetExpenseForm(); return; }
    if (currentTab === 'settings' && editingVehicleId) { closeVehicleForm(); return; }
    if (currentTab !== settings.startTab) { showTab(settings.startTab); return; }
    App.exitApp();
  });
}
