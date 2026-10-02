# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CarConso is a bilingual (French / English) app, mobile first, for tracking fuel consumption and car costs. **One codebase ships twice**:
- **Website / PWA** on GitHub Pages (https://atrena.github.io/CarConso/, repo Atrena/CarConso, branch `main`, root `/`). Every push to `main` redeploys automatically, so unfinished work goes on another branch.
- **Android app** for the Play Store, built with Capacitor 8 (`android/`, app id `io.github.atrena.carconso`).

The web code is vanilla HTML/CSS/JS at the repo root, with no bundler and no test suite. Chart.js 4.4.1 is vendored in `vendor/` (same file as cdnjs, sha384 `bs/nf9Fbd…`). npm is only used for Capacitor.

**Language rules.** Code, comments, docs (README.md, CLAUDE.md), commit messages and release notes are in **English**. The UI is bilingual: every user-facing string goes through `i18n.js` and must be added to both `MESSAGES.fr` and `MESSAGES.en`. Never hard-code UI text in JS or HTML. `README.fr.md` and `confidentialite.html` are the French counterparts of `README.md` and `privacy.html`; keep each pair in sync.

## Commands

- **Web dev server**: `powershell -ExecutionPolicy Bypass -File serve.ps1` (optional `-Port 8000`), then open http://localhost:8000. `.claude/launch.json` defines it as `conso-carbu` for `preview_start`. There are no lint or test commands. Verify changes in the browser at 375px wide, in both themes.
- **Android**: Node, JDK 21 and the Android SDK are installed, but not on PATH in a fresh shell. In Git Bash, set:
  - `PATH="/c/Program Files/nodejs:$PATH"`
  - `JAVA_HOME="/c/Program Files/Microsoft/jdk-21.0.12.101-hotspot"`
  - `ANDROID_HOME="$LOCALAPPDATA/Android/Sdk"`
- **Build and run**:
  - `npm run build` copies the web files to `www/`; `scripts/build-www.mjs` copies root `*.html|css|js|webmanifest` (except `sw.js`) plus `icons/` and `vendor/`.
  - `npx cap sync android` copies `www/` into the Android project.
  - `npm run android` builds and runs on a device or emulator. The AVD is `Medium_Phone_API_37.0`; `adb` is in `$ANDROID_HOME/platform-tools`.
  - `npm run android:bundle` builds the Play Store `.aab`. It is signed only if `android/keystore.properties` exists (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`). That file and `*.jks` are git-ignored and are created by the user, never by Claude.
- **Icons and splash**: `npx capacitor-assets generate --android` reads them from `assets/`. Play Store images are in `store/`.

## Rules when changing code

- **On every release, bump**:
  - `CACHE` in `sw.js` (`carconso-vN`);
  - `APP_VERSION` in `app.js`;
  - `versionName` and `versionCode` in `android/app/build.gradle` (`versionCode` must increase for each Play upload).
- A new JS/CSS file also goes into `APP_SHELL` (sw.js) and into `index.html` in the right order (see below).
- The app used to be called "Conso Carbu". The localStorage keys keep the `conso-carbu:` prefix on purpose (renaming them would wipe users' data), and `parseImport` still accepts old backups.
- Use only relative paths. The site is served under `/CarConso/` and the app under `https://localhost/`.
- The CSP is a `<meta>` in `index.html` and allows `'self'` only, so:
  - no inline scripts and no `style="..."` attributes;
  - no external origins (vendor libraries instead).
- Escape user strings with `escapeHTML` before using them in `innerHTML`. IDs coming from imports are checked with `isId` (`storage.js`).
- Everything must be configurable inside the app, never through config files. The user wants anyone to be able to use it.
- The Android manifest declares **no permissions** (not even INTERNET). The privacy page (`confidentialite.html`, linked from the Play listing) says so; keep both in sync.
- Commits end with the trailer `Co-Authored-By: Claude <noreply@anthropic.com>` (the user asked to be credited alongside Claude).
- Check translation keys after editing texts: every `t('key')`, `tn('key', n)` and `data-i18n*="key"` must exist in both languages.
- Git commits use the GitHub noreply email (`130003506+Atrena@users.noreply.github.com`), never the user's personal address.

## Architecture

Classic `<script>` tags (not modules) share global state. Load order matters:

`vendor/chart.umd.min.js` → `i18n.js` → `stats.js` → `storage.js` → `native.js` → `app.js` → `expenses.js` → `stats-view.js` → `sim-view.js` → `data-view.js` → `settings-view.js`

- **i18n.js**: translations and regional data.
  - `t(key, params)` replaces `{name}` placeholders, and `tn(key, n)` picks `key.one` / `key.other` (in French 0 is singular).
  - `translatePage()` fills the elements tagged `data-i18n` (text), `data-i18n-html` (trusted markup from MESSAGES only), `data-i18n-placeholder` and `data-i18n-aria-label`. Elements whose text changes at runtime (form titles, submit buttons) have no `data-i18n` and are set in JS.
  - `COUNTRIES` lists, per country, the fuels sold there, their local names (optionally per language) and the default units/currency. `fuelLabel(key)` falls back to the international `FUEL_NAMES`.
  - `setLocale(language, country)` sets `LANG`, `COUNTRY` and `LOCALE` (e.g. `fr-BE`), which are used for every `Intl` format.
  - Detection (`detectLanguage`, `detectCountry`) only runs when the setting is missing. On the very first launch (no saved settings at all), the country's defaults are applied too. Changing country in Settings asks before applying its currency/units.
- **stats.js**: pure calculation functions with no DOM access. It holds the fuel catalogue (`FUELS`, each with a `family` (essence/diesel), an `ethanol` % and a `label` getter that follows the country; `REG`/`MID`/`PREM` are the North American grades; `FUELS.E85.ethanol` is overwritten from settings). `FAMILIES`, `EXPENSE_CATEGORIES` and `RECURRENCES` labels are getters over `t()` too and the expense categories and recurrences. It also contains the core algorithms:
  - Fill-to-fill consumption (`computeSegments`).
    - Partial fills (`full: false`) accumulate until the next full fill.
    - The first full fill (and the first one after a fuel-family change) is only a reference and produces no consumption figure. Its distance is optional (it may be 0).
    - A fill's litres replace what was burned over the distance before it. But the fuel actually burned on a segment is what was in the tank: the previous segment's fills plus partial fills on the way, not the closing fill. Per-fuel grouping, ethanol and per-segment cost use that burned mix.
    - A segment's L/100 is displayed on its `startId` fill (the fill whose fuel was burned) in the history, the CSV and the chart. The latest full fill shows "en cours".
  - `estimatePrices` (`PRICE_OFFSETS`) fills in plausible prices for fuels never bought, so every fuel appears in the simulator.
  - Mix grouping (`mixGroup`). A fuel at ≥80% (`DOMINANT_SHARE`) is the dominant one; below that the label is "Mélange A + B". Only fuels of the same family can be mixed.
  - Recurring expenses (`occurrences`/`expandExpenses`, using `addMonths` capped at month end).
  - `forecast`: the average of the last 3 complete months (a first month that does not start on the 1st is skipped) plus the monthly equivalent of recurring expenses.
  - Fuel cost per km (Stats) is the cost of the measured segments over their distance, never "money spent / distance" (that would count the reference fill and the fuel still in the tank).
  - `simulate`: compares compatible fuels. An unmeasured fuel is estimated from the measured group closest in ethanol, × (1 + 0.0035 × Δethanol).
- **storage.js**: localStorage persistence (`Storage.load/save`), validation (`isValidFill/Expense/Vehicle`), `normalize`, import/export.
  - Settings and their allowed values (`ACCENTS`, `CONSO_UNITS`, `VOLUME_UNITS`, `CURRENCIES`, `START_TABS`…) live here. `cleanSettings` resets anything invalid. Lookups into the catalogues use `isKey` (own properties only).
  - `normalize` guarantees there is at least one vehicle, attaches orphan data to it and keeps `activeVehicleId` valid.
  - Backups use JSON format v3 (`{fills, expenses, vehicles}`). `parseImport` still accepts v1/v2 (no vehicles).
  - CSV export follows the language: `;` and a decimal comma in French, `,` and a dot in English, plus a BOM. Headers are translated. Values are always in km, litres and L/100 km.
  - A vehicle may have `extraFuels` (fuels from other countries added by hand) besides `hiddenFuels`; `visibleFuels(v)` = family ∩ (country fuels ∪ extraFuels) − hiddenFuels.
- **native.js**: the Android layer. `IS_APP` is false on the web, where nothing else in the file runs. In the app (it uses `Capacitor.Plugins.*` directly, with no imports):
  - It wraps `Storage.save` to mirror the data into Android `Preferences`, which is included in Android Auto Backup. On first launch it restores that mirror if localStorage is empty, then reloads.
  - It replaces `Storage.download` with Filesystem (cache) + Share sheet.
  - Links to `http…` open in the Browser plugin.
  - It handles the Android back button (cancel edit → start tab → exit).
  - It adds `html.is-app`. CSS classes `.native-only` / `.web-only` switch UI between the app and the site.
- **app.js**: shared helpers and the global state `let {fills, expenses, vehicles, settings} = Storage.load()`.
  - **Unit helpers.** Data is always stored in km, L/100 km and the chosen currency. Never format directly; use:
    - `money`, `pricePerL`;
    - `fmtDist` / `toKm` / `fromKm`, `fmtVol` / `toL` / `fromL` (litres or US gallons), `fmtPrice` / `pricePerVol`;
    - `fmtConso` / `fmtConsoNum` / `consoFormat`;
    - `per100` / `per100Label`.
  - `applySettings()` sets the locale, translates the page and applies theme, accent, text size, density, hidden tabs and unit labels (`.unit-dist`, `.unit-money`). All font sizes in style.css are `calc(Npx * var(--fs))`.
  - `curFills()`/`curExpenses()`/`activeVehicle()` filter to the active vehicle. Views must use these, not the raw arrays.
  - `persist()` saves, then updates the backup dot. Call it after any data mutation.
  - `refreshAll()` rebuilds every text after a language, country or unit change. Inputs typed in miles or gallons go through `inputValue()`, which keeps the exact stored value when the field was not touched.
  - Tab routing uses `TAB_RENDERERS`. Each `*-view.js` registers its render function there. The start tab is shown on `DOMContentLoaded`. The file also contains the fill form (odometer ↔ distance sync in the display unit, multi-fuel parts).
- **expenses.js, stats-view.js, sim-view.js, settings-view.js**: one file per tab (Frais, Stats, Simulateur, Paramètres). In settings-view.js, settings controls are generated from `SETTING_CHOICES` via `data-setting` attributes.
- **data-view.js**: the Data section of Settings. It handles file export/import (`confirmAndRestore`: a v3 import replaces everything, v1/v2 only the active vehicle's data) and the 30-day backup reminder (web only). There is no cloud sync in the web version; `Storage.load` deletes the old Drive keys (`OBSOLETE_KEYS`).
- **sw.js**: web only, not registered in the app. Network-first with cache fallback.

Each fill and expense has a `vehicleId`. A fill holds `parts: [{fuel, litres, total}]`, so a single fill can mix several fuels.
