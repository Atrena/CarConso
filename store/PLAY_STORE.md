# Google Play release kit

Everything needed to fill in the Play Console for CarConso. Texts are ready to paste,
in French (default listing language) and English.

## 1. App details

| Field | Value |
|---|---|
| App name | CarConso |
| Package | `io.github.atrena.carconso` (final once published) |
| Default language | French (fr-FR), with an English (en-US) translation |
| App or game | App |
| Free or paid | Free |
| Category | Auto & Vehicles |
| Tags | Fuel, Vehicles, Budget |
| Website | https://atrena.github.io/CarConso/ |
| Privacy policy | https://atrena.github.io/CarConso/confidentialite.html (links to the English version) |
| Contact email | Required and shown publicly: choose an address you are happy to publish |

## 2. Store listing

### Short description (max. 80 characters)

- **fr-FR**: Suivi de conso et de coûts de ta voiture, hors ligne, sans compte ni pub.
- **en-US**: Track your car's fuel consumption and costs. Offline, no account, no ads.

### Full description (fr-FR)

```
CarConso suit la consommation et le budget de ta voiture, simplement, sans compte et sans publicité.

⛽ PLEINS
Note chaque plein : quantité, prix, compteur ou distance. Pleins partiels et mélanges de carburants compatibles (ex. SP-95 E10 + E85) sont gérés.

📊 CONSO RÉELLE
CarConso utilise la méthode plein à plein, la plus fiable : la conso est attribuée au carburant qui était vraiment dans le réservoir. Tu compares ainsi tes carburants et tes mélanges sur des chiffres réels.

🧮 SIMULATEUR
Entre les prix à la pompe : CarConso classe les carburants selon leur coût réel aux 100 km, avec ta propre conso, et calcule le prix maximum auquel l'E85 reste rentable.

🔧 FRAIS
Entretien, assurance, pneus, péages… ponctuels ou récurrents (mensuels, annuels…).

📈 STATISTIQUES
Conso moyenne, coût au km (carburant et total), dépenses par mois, prévision de budget annuel, filtre par période.

🚗 PLUSIEURS VÉHICULES
Essence ou diesel, capacité du réservoir et carburants proposés pour chacun.

🌍 TON PAYS, TES UNITÉS
Français ou anglais. Noms des carburants selon le pays (France, Belgique, Suisse, Canada, Royaume-Uni, États-Unis, Allemagne…). L/100 km, km/L ou mpg, km ou miles, litres ou gallons, €, CHF, £, $.

🎨 PERSONNALISATION
Thème clair ou sombre, couleur, taille du texte, affichage compact, écran d'ouverture.

🔒 TES DONNÉES RESTENT CHEZ TOI
Aucune collecte, aucun serveur, aucune autorisation demandée. Les données sont incluses dans la sauvegarde Google de ton téléphone, et tu peux les exporter (sauvegarde complète, CSV pour Excel).

Logiciel libre (GPL-3.0) : le code source est sur GitHub.
```

### Full description (en-US)

```
CarConso tracks your car's fuel consumption and costs. Simple, with no account and no ads.

⛽ FILL-UPS
Log every fill-up: volume, price, odometer or distance. Partial fill-ups and blends of compatible fuels (e.g. E10 + E85) are supported.

📊 REAL CONSUMPTION
CarConso uses the fill-to-fill method, the most reliable one: consumption is credited to the fuel that was actually in the tank. You can compare fuels and blends on real figures.

🧮 SIMULATOR
Enter today's pump prices: CarConso ranks the fuels by their real cost per 100 km or miles, using your own consumption, and works out the highest price at which E85 still pays off.

🔧 EXPENSES
Service, insurance, tires, tolls… one-off or recurring (monthly, yearly…).

📈 STATISTICS
Average consumption, cost per mile or km (fuel and total), monthly spending, yearly budget forecast, period filter.

🚗 SEVERAL VEHICLES
Petrol or diesel, tank capacity and fuels offered for each one.

🌍 YOUR COUNTRY, YOUR UNITS
English or French. Local fuel names (United States, Canada, United Kingdom, Ireland, Germany, France…). mpg (US or UK), L/100 km or km/L, miles or km, gallons or litres, $, £, €, CHF.

🎨 CUSTOMISATION
Light or dark theme, colour, text size, compact layout, start screen.

🔒 YOUR DATA STAYS WITH YOU
No data collection, no server, no permissions. Your data is included in your phone's Google backup, and you can export it (full backup, CSV for Excel).

Free software (GPL-3.0): the source code is on GitHub.
```

### Graphics

| Asset | File |
|---|---|
| App icon (512 × 512) | `store/icon-512.png` |
| Feature graphic (1024 × 500) | `store/banner-fr-1024x500.png` (fr), `store/banner-en-1024x500.png` (en) |
| Phone screenshots (1080 × 1920) | `store/screenshots/fr/*.png`, `store/screenshots/en/*.png` (demo data) |

## 3. App content (Policy section)

| Form | Answer |
|---|---|
| Privacy policy | URL above |
| Ads | No, the app contains no ads |
| App access | All functionality is available without special access |
| Content rating (IARC) | Category "Utility, productivity, communication or other"; answer **No** to every question (no violence, no user interaction, no sharing of location, no purchases). Expected rating: PEGI 3 / Everyone |
| Target audience | 18 and over; the app is not designed for children |
| News app | No |
| Government app | No |
| Financial features | The app provides no financial features |
| Health | No health features |

### Data safety

- Does the app collect or share any of the required user data types? **No.**
- Reason: nothing leaves the phone through the app. It has no network permission and
  no server. Android Auto Backup is a system feature managed by the user's Google
  account; the developer has no access to that data.
- Account creation: the app has no accounts.

## 4. Build and upload

1. **Upload key** (once, by the developer only; keep the file and passwords safe, never on GitHub):
   ```
   keytool -genkeypair -v -keystore "%USERPROFILE%\carconso-upload.jks" -alias carconso -keyalg RSA -keysize 2048 -validity 10000
   ```
   (`keytool` is in the JDK's `bin` folder.) Then fill in `android/keystore.properties`:
   `storeFile`, `storePassword`, `keyAlias`, `keyPassword`.
2. **Build** the signed bundle and APK:
   ```
   npm run build
   npx cap sync android
   npm run android:bundle        # android/app/build/outputs/bundle/release/app-release.aab
   cd android && gradlew assembleRelease   # signed APK for the GitHub release
   ```
3. **Play App Signing**: on the first upload, Google offers to generate the app signing key.
   To let the GitHub APK and the Play version update each other, choose instead
   *Use a different key* → *Export and upload a key from Java keystore* and follow the
   PEPK steps with the same `.jks`. This choice cannot be changed later.
4. **Closed test**: new personal developer accounts must run a closed test with at least
   12 testers for 14 days before applying for production access.
5. **Each update**: bump `versionCode` (+1) and `versionName` in `android/app/build.gradle`,
   `APP_VERSION` in `app.js` and `CACHE` in `sw.js`.
