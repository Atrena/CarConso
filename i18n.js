// Translations (French / English) and regional settings: country, fuel names
// and default units. Loaded first: every other script uses t() and fuelLabel().

const LANGUAGES = { fr: 'Français', en: 'English' };

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
    names: { E10: 'Essence 95 E10', SP98: 'Essence 98 E5', B7: 'Diesel B7', B7P: 'Diesel Premium' },
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
  OTHER: {
    fuels: ['E5', 'E10', 'SP95P', 'SP98', 'SP98P', 'E85', 'B7', 'B7P'],
    names: {},
    defaults: { currency: 'EUR', distanceUnit: 'km', consoUnit: 'l100', volumeUnit: 'L' },
  },
};

// International fuel names, by UI language.
const FUEL_NAMES = {
  fr: {
    E5: 'Sans plomb 95 (E5)', E10: 'Sans plomb 95 (E10)', SP95P: 'Sans plomb 95 Premium', SP98: 'Sans plomb 98',
    SP98P: 'Sans plomb 98 Premium', REG: 'Ordinaire', MID: 'Intermédiaire', PREM: 'Super', E85: 'E85',
    B7: 'Diesel', B7P: 'Diesel Premium',
  },
  en: {
    E5: 'Unleaded 95 (E5)', E10: 'Unleaded 95 (E10)', SP95P: 'Premium 95', SP98: 'Super 98',
    SP98P: 'Premium 98', REG: 'Regular', MID: 'Midgrade', PREM: 'Premium', E85: 'E85',
    B7: 'Diesel', B7P: 'Premium Diesel',
  },
};

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

function fuelLabel(key) {
  const names = COUNTRIES[COUNTRY].names;
  const local = names[LANG] || names;
  return local[key] || FUEL_NAMES[LANG][key] || key;
}

/* ---------- Messages ---------- */

const MESSAGES = {
  fr: {
    'common.save': 'Enregistrer', 'common.update': 'Mettre à jour', 'common.cancel': 'Annuler',
    'common.delete': 'Supprimer', 'common.add': 'Ajouter', 'common.date': 'Date', 'common.optional': '(facultatif)',
    'common.or': 'ou', 'common.unknownError': 'erreur inconnue',

    'nav.add': 'Plein', 'nav.history': 'Historique', 'nav.expenses': 'Frais', 'nav.stats': 'Stats',
    'nav.sim': 'Simulateur', 'nav.settings': 'Paramètres', 'topbar.vehicle': 'Véhicule',

    'fill.new': 'Nouveau plein', 'fill.edit': 'Modifier le plein', 'fill.odometer': 'Compteur',
    'fill.distance': 'Distance parcourue', 'fill.full': 'Plein complet',
    'fill.fullHint': 'Réservoir rempli à ras. Désactive pour un plein partiel.',
    'fill.fuel': 'Carburant', 'fill.addFuel': 'Ajouter un carburant (mélange)', 'fill.fuelType': 'Type de carburant',
    'fill.volume.L': 'Litres', 'fill.volume.gal': 'Gallons', 'fill.totalPrice': 'Prix total',
    'fill.removeFuel': 'Retirer ce carburant', 'fill.confirmDelete': 'Supprimer ce plein ?',
    'odo.previous': 'Compteur au plein précédent : {value}',
    'odo.unknown': 'Compteur du plein précédent inconnu : indique aussi la distance.',
    'odo.first': 'Premier plein : il sert de référence, la distance est facultative. Note le compteur pour calculer les suivants.',
    'preview.total': 'Total', 'preview.amount': 'Montant', 'preview.price': 'Prix {per}', 'preview.ethanol': 'Éthanol',
    'preview.cost': 'Coût du trajet {per100}', 'preview.mix': 'Mélange',
    'preview.conso': 'Conso du plein du {date}',
    'err.date': 'Indique la date du plein.', 'err.odoNumber': 'Le compteur doit être un nombre de {unit}.',
    'err.odoPrevious': 'Le compteur doit dépasser celui du plein précédent ({value}).',
    'err.distance': 'Indique le compteur ou la distance depuis le plein précédent.',
    'err.volume': 'Indique la quantité pour chaque carburant.', 'err.total': 'Indique le prix total payé pour chaque carburant.',
    'err.duplicateFuel': 'Chaque carburant ne doit apparaître qu\'une fois.',
    'err.mixFamilies': 'On ne peut pas mélanger essence et gazole.',
    'toast.fillSaved': 'Plein enregistré', 'toast.fillUpdated': 'Plein mis à jour', 'toast.partialSaved': 'Plein partiel enregistré',
    'toast.fillConso': '{title} — plein du {date} : {conso}',
    'toast.fillLater': '{title} — conso calculée au prochain plein complet',
    'toast.fillDeleted': 'Plein supprimé', 'toast.saveError': 'Erreur : impossible d\'enregistrer les données',
    'toast.vehicle': 'Véhicule : {name}',

    'history.title': 'Historique', 'history.lead': 'Touche un plein pour le modifier.',
    'history.empty': 'Aucun plein pour ce véhicule.', 'history.current': 'en cours', 'history.partial': 'Partiel',
    'history.odometer': 'Compteur : {value}',

    'mix.share': '{pct} % {name}', 'mix.group': 'Mélange {names}',
    'family.essence': 'Essence', 'family.diesel': 'Gazole',

    'category.entretien': 'Entretien / vidange', 'category.pneus': 'Pneus', 'category.reparation': 'Réparation',
    'category.assurance': 'Assurance', 'category.controle': 'Contrôle technique', 'category.peage': 'Péage',
    'category.parking': 'Parking', 'category.lavage': 'Lavage', 'category.autre': 'Autre',
    'rec.monthly': 'Tous les mois', 'rec.quarterly': 'Tous les 3 mois', 'rec.semiannual': 'Tous les 6 mois', 'rec.yearly': 'Tous les ans',
    'recShort.monthly': 'Mensuel', 'recShort.quarterly': 'Trimestriel', 'recShort.semiannual': 'Semestriel', 'recShort.yearly': 'Annuel',
    'recPer.monthly': '/mois', 'recPer.quarterly': '/trimestre', 'recPer.semiannual': '/semestre', 'recPer.yearly': '/an',

    'exp.new': 'Nouveau frais', 'exp.edit': 'Modifier le frais', 'exp.lead': 'Entretien, assurance, péages… ponctuels ou récurrents.',
    'exp.category': 'Catégorie', 'exp.amount': 'Montant', 'exp.note': 'Note', 'exp.notePlaceholder': 'Vidange + filtre à huile',
    'exp.repeat': 'Répétition', 'exp.until': 'Jusqu\'au', 'exp.none': 'Aucune (frais ponctuel)',
    'exp.recHint': '{rec} à partir du {date}. Les échéances passées sont comptées automatiquement dans les stats.',
    'exp.since': 'Depuis le {date}', 'exp.sinceUntil': 'Depuis le {date} jusqu\'au {end}',
    'exp.payments.one': '{n} échéance : {amount}', 'exp.payments.other': '{n} échéances : {amount}',
    'exp.next': 'prochaine le {date}', 'exp.ended': 'terminé', 'exp.empty': 'Aucun frais pour ce véhicule.',
    'exp.recurring': 'Récurrents', 'exp.oneOff': 'Ponctuels',
    'exp.errDate': 'Indique la date.', 'exp.errAmount': 'Indique le montant.',
    'exp.errEnd': 'La date de fin doit être après la date de début.',
    'exp.updated': 'Frais mis à jour', 'exp.addedRec': 'Frais récurrent ajouté : {amount} {per}', 'exp.added': 'Frais ajouté : {amount}',
    'exp.confirmDeleteRec': 'Supprimer ce frais récurrent et toutes ses échéances ? Pour simplement l\'arrêter, indique plutôt une date de fin.',
    'exp.confirmDelete': 'Supprimer ce frais ?', 'exp.deleted': 'Frais supprimé',

    'stats.title': 'Statistiques', 'period.label': 'Période', 'period.1': '1 mois', 'period.3': '3 mois',
    'period.12': '1 an', 'period.all': 'Tout', 'stats.empty': 'Pas encore de consommation sur cette période : il faut au moins deux pleins complets.',
    'stats.consoChart': 'Consommation par plein', 'stats.byFuel': 'Par carburant / mélange', 'stats.priceChart': 'Prix {per}',
    'stats.monthly': 'Dépenses par mois', 'stats.byCategory': 'Frais par catégorie', 'stats.forecast': 'Prévisions',
    'stats.avg': 'Conso moyenne', 'stats.autonomy': 'Autonomie ≈ {dist} (réservoir {tank})',
    'stats.last': 'Dernière', 'stats.best': 'Meilleure', 'stats.worst': 'Pire',
    'card.avgPrice': 'Prix moyen', 'card.fuelPer': 'Carburant au {unit}', 'card.totalPer': 'Coût total au {unit}',
    'card.fuelAndExpenses': 'carburant + frais', 'card.distance': 'Distance', 'card.used': '{volume} achetés',
    'card.fuel': 'Carburant', 'card.expenses': 'Frais', 'card.expensesSub': 'entretien, assurance…',
    'th.fuel': 'Carburant', 'th.conso': 'Conso', 'th.fills': 'Pleins', 'th.spent': 'Dépensé', 'th.avgPrice': 'Prix moyen',
    'th.category': 'Catégorie', 'th.count': 'Nombre', 'th.total': 'Total', 'th.price': 'Prix',
    'stats.noExpense': 'Aucun frais sur cette période.', 'chart.fuel': 'Carburant', 'chart.expenses': 'Frais',
    'fc.fuel': 'Carburant / mois', 'fc.months.one': 'sur {n} mois', 'fc.months.other': 'sur {n} mois',
    'fc.expenses': 'Frais / mois', 'fc.inclRecurring': 'récurrents compris', 'fc.km': 'Km par mois', 'fc.mi': 'Miles par mois',
    'fc.budget': 'Budget annuel', 'fc.empty': 'Les prévisions apparaîtront après un premier mois complet de données.',

    'unit.km': 'km', 'unit.mile': 'mile', 'unit.perL': 'au litre', 'unit.perGal': 'au gallon',

    'sim.title': 'Quel carburant choisir ?',
    'sim.lead': 'Entre les prix à la pompe : le classement utilise ta conso réelle pour chaque carburant.',
    'sim.prices': 'Prix à la pompe', 'sim.priceEstimated': 'estimé', 'sim.consoEstimated': 'estimée',
    'sim.needFills': 'Ajoute au moins deux pleins complets pour utiliser le simulateur.',
    'sim.needPrice': 'Entre au moins un prix.', 'sim.cheapest': 'Le moins cher', 'sim.per100': 'aux 100 {unit}',
    'sim.ranking': 'Classement', 'sim.mix': 'mélange {mix}',
    'sim.saving': 'Soit {amount} d\'économie aux 100 {unit} par rapport à {name}.',
    'sim.breakEven': 'L\'E85 est rentable tant qu\'il coûte moins de <strong>{price}</strong> (comparé au {name}).',
    'sim.notePrice': 'Prix « estimé » : carburant jamais acheté, prix déduit de ton dernier prix payé avec l\'écart habituel à la pompe. Remplace-le par le prix affiché à ta station.',
    'sim.noteConso': 'Conso « estimée » : pas encore mesurée avec ce carburant, déduite de ta conso réelle avec le carburant le plus proche (selon le taux d\'éthanol). Elle devient réelle quand tu as roulé un plein entier avec : il faut un plein complet de ce carburant, puis le plein complet suivant.',

    'settings.title': 'Paramètres', 'settings.vehicles': 'Mes véhicules', 'settings.addVehicle': 'Ajouter un véhicule',
    'vehicle.new': 'Nouveau véhicule', 'vehicle.edit': 'Modifier « {name} »', 'vehicle.name': 'Nom',
    'vehicle.namePlaceholder': 'Clio, voiture de Julie…', 'vehicle.engine': 'Motorisation',
    'vehicle.locked': 'Verrouillée : ce véhicule a déjà des pleins.', 'vehicle.tank': 'Capacité du réservoir',
    'vehicle.fuels': 'Carburants proposés',
    'vehicle.fuelsHint': 'Décoche ceux que tu n\'utilises jamais : ils disparaissent des listes et du simulateur.',
    'vehicle.allFuels': 'Afficher les carburants d\'autres pays', 'vehicle.defaultFuel': 'Carburant par défaut',
    'vehicle.lastUsed': 'Le dernier utilisé', 'vehicle.active': 'Actif', 'vehicle.tankBadge': 'Réservoir {value}',
    'vehicle.errName': 'Donne un nom au véhicule.', 'vehicle.errDuplicate': 'Un véhicule porte déjà ce nom.',
    'vehicle.errTank': 'La capacité du réservoir doit être un nombre de {unit}.',
    'vehicle.errFuels': 'Garde au moins un carburant proposé.',
    'vehicle.added': '« {name} » ajouté et sélectionné', 'vehicle.updated': 'Véhicule mis à jour',
    'vehicle.confirmDelete': 'Supprimer « {name} » ainsi que ses {fills} et {expenses} ?\n\nCette action est définitive.',
    'vehicle.deleted': '« {name} » supprimé', 'vehicle.defaultName': 'Ma voiture',
    'count.fills.one': '{n} plein', 'count.fills.other': '{n} pleins',
    'count.expenses.one': '{n} frais', 'count.expenses.other': '{n} frais',
    'count.vehicles.one': '{n} véhicule', 'count.vehicles.other': '{n} véhicules',
    'summary.vehicles.one': 'véhicule', 'summary.vehicles.other': 'véhicules',
    'summary.fills.one': 'plein', 'summary.fills.other': 'pleins', 'summary.expenses.one': 'frais', 'summary.expenses.other': 'frais',

    'settings.region': 'Langue et pays', 'settings.language': 'Langue', 'settings.country': 'Pays',
    'settings.countryHint': 'Le pays détermine le nom et la liste des carburants proposés.',
    'settings.applyRegion': 'Utiliser aussi la devise et les unités de ce pays ?\n\n{details}',
    'country.FR': 'France', 'country.BE': 'Belgique', 'country.LU': 'Luxembourg', 'country.CH': 'Suisse',
    'country.CA': 'Canada', 'country.GB': 'Royaume-Uni', 'country.IE': 'Irlande', 'country.US': 'États-Unis',
    'country.DE': 'Allemagne', 'country.AT': 'Autriche', 'country.OTHER': 'Autre pays',
    'settings.appearance': 'Apparence', 'settings.theme': 'Thème', 'theme.auto': 'Automatique', 'theme.light': 'Clair',
    'theme.dark': 'Sombre', 'settings.themeHint': '« Automatique » suit le réglage clair / sombre de ton téléphone.',
    'settings.color': 'Couleur', 'accent.teal': 'Turquoise', 'accent.blue': 'Bleu', 'accent.violet': 'Violet',
    'accent.rose': 'Rose', 'accent.orange': 'Orange', 'accent.green': 'Vert',
    'settings.textSize': 'Taille du texte', 'text.small': 'Petite', 'text.normal': 'Normale', 'text.large': 'Grande',
    'settings.density': 'Densité d\'affichage', 'density.normal': 'Normale', 'density.compact': 'Compacte',
    'settings.densityHint': '« Compacte » réduit les marges pour voir plus d\'informations à l\'écran.',
    'settings.units': 'Unités', 'settings.conso': 'Consommation', 'settings.distance': 'Distance', 'settings.volume': 'Volume',
    'settings.currency': 'Devise', 'settings.priceDecimals': 'Décimales des prix',
    'dist.km': 'km', 'dist.mi': 'Miles', 'vol.L': 'Litres', 'vol.gal': 'Gallons (US)',
    'dec.2': '2 décimales', 'dec.3': '3 décimales',
    'currency.EUR': 'Euro (€)', 'currency.CHF': 'Franc suisse (CHF)', 'currency.GBP': 'Livre sterling (£)',
    'currency.USD': 'Dollar américain ($)', 'currency.CAD': 'Dollar canadien ($)',
    'settings.unitsHint': 'Changer d\'unité ne modifie pas tes données : seul l\'affichage est converti. Les exports Excel restent en km, litres et L/100 km.',
    'settings.nav': 'Navigation et saisie', 'settings.startTab': 'Écran à l\'ouverture', 'settings.tabs': 'Onglets affichés',
    'settings.tabsHint': 'Masque les onglets dont tu ne te sers pas. Les frais déjà saisis restent comptés dans les stats.',
    'settings.defaultFull': '« Plein complet » coché par défaut', 'settings.defaultFullHint': 'Décoche si tu fais surtout des pleins partiels.',
    'settings.fuels': 'Carburants', 'settings.e85': 'Taux d\'éthanol de l\'E85',
    'settings.e85Hint': 'Le taux réel varie selon la saison et la station (65 à 85 %). Il sert à calculer le taux d\'éthanol de tes mélanges et les estimations du simulateur.',
    'settings.e85Toast': 'E85 : {n} % d\'éthanol',
    'settings.decrease': 'Diminuer', 'settings.increase': 'Augmenter',

    'data.title': 'Données', 'data.leadWeb': 'Tout est enregistré uniquement dans ce navigateur, sur cet appareil.',
    'data.leadApp': 'Tout est enregistré uniquement dans l\'application, sur ce téléphone.',
    'data.androidTitle': 'Sauvegarde Android automatique',
    'data.androidText': 'Tes véhicules, pleins, frais et réglages sont inclus dans la <strong>sauvegarde Google de ton téléphone</strong> (sur ton Google Drive). Ils reviennent automatiquement si tu réinstalles l\'app ou changes de téléphone avec le même compte Google.',
    'data.androidHint': 'À vérifier dans les paramètres Android › Google › Sauvegarde : la sauvegarde doit être activée. Elle a lieu environ une fois par jour, téléphone en charge et en Wi-Fi.',
    'data.backupTitle': 'Sauvegarde complète',
    'data.backupText': 'Un fichier contenant <strong>tous tes véhicules, pleins et frais</strong> (récurrents compris). Garde-le en lieu sûr (ordinateur, cloud, mail…) : il permet de tout restaurer, même sur un autre téléphone.',
    'data.download': 'Télécharger la sauvegarde', 'data.share': 'Enregistrer / envoyer la sauvegarde',
    'data.restore': 'Restaurer depuis un fichier', 'data.restoreHint': 'La restauration remplace les pleins et frais actuels.',
    'data.excelTitle': 'Export Excel',
    'data.excelText': 'Pour consulter ou retravailler tes chiffres dans un tableur. Ces fichiers ne servent pas à restaurer l\'application.',
    'data.csvFills': 'Pleins', 'data.csvFillsSub': 'Date, compteur, litres, prix, conso… (.csv)',
    'data.csvExpenses': 'Frais', 'data.csvExpensesSub': 'Une ligne par échéance, récurrents compris (.csv)',
    'data.clearTitle': 'Tout effacer',
    'data.clearText': 'Supprime définitivement les pleins et frais de tous les véhicules. Les véhicules et réglages sont conservés. Pense à télécharger une sauvegarde avant.',
    'data.clearButton': 'Effacer tous les pleins et frais',
    'backup.none': 'Aucune sauvegarde téléchargée pour l\'instant.', 'backup.today': 'aujourd\'hui', 'backup.yesterday': 'hier',
    'backup.daysAgo': 'il y a {n} jours', 'backup.last': 'Dernière sauvegarde : {when} ({date}).',
    'backup.downloaded': 'Sauvegarde téléchargée', 'restore.error': 'Restauration impossible : {msg}',
    'restore.confirmFull': 'Restaurer {vehicles}, {fills} et {expenses} ?\n\nTous les véhicules, pleins et frais actuels seront remplacés.',
    'restore.confirmOld': 'Cette ancienne sauvegarde ne contient pas de véhicule.\n\nRestaurer {fills} et {expenses} dans « {name} » ? Les pleins et frais actuels de ce véhicule seront remplacés.',
    'restore.done': 'Sauvegarde restaurée',
    'clear.confirm': 'Effacer définitivement tous les pleins et frais de tous les véhicules ?\n\nLes véhicules et les réglages sont conservés.',
    'clear.done': 'Tous les pleins et frais ont été effacés',
    'export.dialog': 'Enregistrer ou envoyer', 'export.error': 'Export impossible : {msg}',
    'import.unreadable': 'fichier JSON illisible.', 'import.notBackup': 'ce fichier n\'est pas une sauvegarde CarConso.',
    'import.invalid': '{n} élément(s) invalide(s) dans le fichier.', 'import.noVehicle': 'aucun véhicule dans le fichier.',
    'import.unknownVehicle': 'des pleins ou frais sont rattachés à un véhicule inconnu.',
    'file.backup': 'carconso-sauvegarde', 'file.fills': 'carconso-pleins', 'file.expenses': 'carconso-frais',
    'csv.fills': 'vehicule|date|compteur_km|distance_km|plein_complet|carburants|litres|total|prix_litre|ethanol_pct|conso_l100',
    'csv.expenses': 'vehicule|date|categorie|montant|recurrence|note', 'csv.yes': 'oui', 'csv.no': 'non',

    'about.title': 'À propos', 'about.source': 'Code source sur GitHub',
    'about.sourceSub': 'Logiciel libre (GPL v3) : consulte le code, signale un problème…',
    'about.privacy': 'Confidentialité', 'about.privacySub': 'Aucune donnée collectée : tout reste sur ton appareil.',
    'about.offline': 'fonctionne hors ligne', 'about.credits': 'Développée avec l\'aide de Claude (Anthropic)',
    'about.privacyUrl': 'https://atrena.github.io/CarConso/confidentialite.html',
  },

  en: {
    'common.save': 'Save', 'common.update': 'Update', 'common.cancel': 'Cancel',
    'common.delete': 'Delete', 'common.add': 'Add', 'common.date': 'Date', 'common.optional': '(optional)',
    'common.or': 'or', 'common.unknownError': 'unknown error',

    'nav.add': 'Fill-up', 'nav.history': 'History', 'nav.expenses': 'Expenses', 'nav.stats': 'Stats',
    'nav.sim': 'Simulator', 'nav.settings': 'Settings', 'topbar.vehicle': 'Vehicle',

    'fill.new': 'New fill-up', 'fill.edit': 'Edit fill-up', 'fill.odometer': 'Odometer',
    'fill.distance': 'Distance driven', 'fill.full': 'Full tank',
    'fill.fullHint': 'Tank filled to the top. Turn off for a partial fill-up.',
    'fill.fuel': 'Fuel', 'fill.addFuel': 'Add a fuel (blend)', 'fill.fuelType': 'Fuel type',
    'fill.volume.L': 'Litres', 'fill.volume.gal': 'Gallons', 'fill.totalPrice': 'Total price',
    'fill.removeFuel': 'Remove this fuel', 'fill.confirmDelete': 'Delete this fill-up?',
    'odo.previous': 'Odometer at previous fill-up: {value}',
    'odo.unknown': 'Previous odometer reading unknown: enter the distance too.',
    'odo.first': 'First fill-up: it is the reference, the distance is optional. Enter the odometer to work out the next ones.',
    'preview.total': 'Total', 'preview.amount': 'Amount', 'preview.price': 'Price {per}', 'preview.ethanol': 'Ethanol',
    'preview.cost': 'Trip cost {per100}', 'preview.mix': 'Blend',
    'preview.conso': 'Consumption of the {date} fill-up',
    'err.date': 'Enter the date of the fill-up.', 'err.odoNumber': 'The odometer must be a number of {unit}.',
    'err.odoPrevious': 'The odometer must be higher than at the previous fill-up ({value}).',
    'err.distance': 'Enter the odometer or the distance since the previous fill-up.',
    'err.volume': 'Enter the quantity for each fuel.', 'err.total': 'Enter the total price paid for each fuel.',
    'err.duplicateFuel': 'Each fuel can only appear once.',
    'err.mixFamilies': 'Petrol and diesel cannot be mixed.',
    'toast.fillSaved': 'Fill-up saved', 'toast.fillUpdated': 'Fill-up updated', 'toast.partialSaved': 'Partial fill-up saved',
    'toast.fillConso': '{title} — fill-up of {date}: {conso}',
    'toast.fillLater': '{title} — consumption calculated at the next full fill-up',
    'toast.fillDeleted': 'Fill-up deleted', 'toast.saveError': 'Error: the data could not be saved',
    'toast.vehicle': 'Vehicle: {name}',

    'history.title': 'History', 'history.lead': 'Tap a fill-up to edit it.',
    'history.empty': 'No fill-up for this vehicle.', 'history.current': 'in progress', 'history.partial': 'Partial',
    'history.odometer': 'Odometer: {value}',

    'mix.share': '{pct}% {name}', 'mix.group': 'Blend {names}',
    'family.essence': 'Petrol', 'family.diesel': 'Diesel',

    'category.entretien': 'Service / oil change', 'category.pneus': 'Tyres', 'category.reparation': 'Repair',
    'category.assurance': 'Insurance', 'category.controle': 'Roadworthiness test', 'category.peage': 'Tolls',
    'category.parking': 'Parking', 'category.lavage': 'Car wash', 'category.autre': 'Other',
    'rec.monthly': 'Every month', 'rec.quarterly': 'Every 3 months', 'rec.semiannual': 'Every 6 months', 'rec.yearly': 'Every year',
    'recShort.monthly': 'Monthly', 'recShort.quarterly': 'Quarterly', 'recShort.semiannual': 'Half-yearly', 'recShort.yearly': 'Yearly',
    'recPer.monthly': '/month', 'recPer.quarterly': '/quarter', 'recPer.semiannual': '/half-year', 'recPer.yearly': '/year',

    'exp.new': 'New expense', 'exp.edit': 'Edit expense', 'exp.lead': 'Service, insurance, tolls… one-off or recurring.',
    'exp.category': 'Category', 'exp.amount': 'Amount', 'exp.note': 'Note', 'exp.notePlaceholder': 'Oil and filter change',
    'exp.repeat': 'Repeat', 'exp.until': 'Until', 'exp.none': 'None (one-off expense)',
    'exp.recHint': '{rec} from {date}. Past payments are counted automatically in the stats.',
    'exp.since': 'Since {date}', 'exp.sinceUntil': 'From {date} until {end}',
    'exp.payments.one': '{n} payment: {amount}', 'exp.payments.other': '{n} payments: {amount}',
    'exp.next': 'next on {date}', 'exp.ended': 'ended', 'exp.empty': 'No expense for this vehicle.',
    'exp.recurring': 'Recurring', 'exp.oneOff': 'One-off',
    'exp.errDate': 'Enter the date.', 'exp.errAmount': 'Enter the amount.',
    'exp.errEnd': 'The end date must be after the start date.',
    'exp.updated': 'Expense updated', 'exp.addedRec': 'Recurring expense added: {amount} {per}', 'exp.added': 'Expense added: {amount}',
    'exp.confirmDeleteRec': 'Delete this recurring expense and all its payments? To simply stop it, set an end date instead.',
    'exp.confirmDelete': 'Delete this expense?', 'exp.deleted': 'Expense deleted',

    'stats.title': 'Statistics', 'period.label': 'Period', 'period.1': '1 month', 'period.3': '3 months',
    'period.12': '1 year', 'period.all': 'All', 'stats.empty': 'No consumption in this period yet: at least two full fill-ups are needed.',
    'stats.consoChart': 'Consumption per fill-up', 'stats.byFuel': 'By fuel / blend', 'stats.priceChart': 'Price {per}',
    'stats.monthly': 'Monthly spending', 'stats.byCategory': 'Expenses by category', 'stats.forecast': 'Forecast',
    'stats.avg': 'Average consumption', 'stats.autonomy': 'Range ≈ {dist} ({tank} tank)',
    'stats.last': 'Last', 'stats.best': 'Best', 'stats.worst': 'Worst',
    'card.avgPrice': 'Average price', 'card.fuelPer': 'Fuel per {unit}', 'card.totalPer': 'Total cost per {unit}',
    'card.fuelAndExpenses': 'fuel + expenses', 'card.distance': 'Distance', 'card.used': '{volume} bought',
    'card.fuel': 'Fuel', 'card.expenses': 'Expenses', 'card.expensesSub': 'service, insurance…',
    'th.fuel': 'Fuel', 'th.conso': 'Cons.', 'th.fills': 'Fill-ups', 'th.spent': 'Spent', 'th.avgPrice': 'Avg price',
    'th.category': 'Category', 'th.count': 'Count', 'th.total': 'Total', 'th.price': 'Price',
    'stats.noExpense': 'No expense in this period.', 'chart.fuel': 'Fuel', 'chart.expenses': 'Expenses',
    'fc.fuel': 'Fuel / month', 'fc.months.one': 'over {n} month', 'fc.months.other': 'over {n} months',
    'fc.expenses': 'Expenses / month', 'fc.inclRecurring': 'incl. recurring', 'fc.km': 'Km per month', 'fc.mi': 'Miles per month',
    'fc.budget': 'Yearly budget', 'fc.empty': 'The forecast will appear after a first full month of data.',

    'unit.km': 'km', 'unit.mile': 'mile', 'unit.perL': 'per litre', 'unit.perGal': 'per gallon',

    'sim.title': 'Which fuel should I choose?',
    'sim.lead': 'Enter the pump prices: the ranking uses your real consumption for each fuel.',
    'sim.prices': 'Pump prices', 'sim.priceEstimated': 'estimated', 'sim.consoEstimated': 'estimated',
    'sim.needFills': 'Add at least two full fill-ups to use the simulator.',
    'sim.needPrice': 'Enter at least one price.', 'sim.cheapest': 'Cheapest', 'sim.per100': 'per 100 {unit}',
    'sim.ranking': 'Ranking', 'sim.mix': '{mix} blend',
    'sim.saving': 'That is {amount} saved per 100 {unit} compared with {name}.',
    'sim.breakEven': 'E85 pays off as long as it costs less than <strong>{price}</strong> (compared with {name}).',
    'sim.notePrice': '“Estimated” price: fuel never bought, price derived from your last price paid with the usual difference at the pump. Replace it with the price shown at your station.',
    'sim.noteConso': '“Estimated” consumption: not measured with this fuel yet, derived from your real consumption with the closest fuel (by ethanol content). It becomes real once you have driven a full tank of it: a full fill-up of this fuel, then the next full fill-up.',

    'settings.title': 'Settings', 'settings.vehicles': 'My vehicles', 'settings.addVehicle': 'Add a vehicle',
    'vehicle.new': 'New vehicle', 'vehicle.edit': 'Edit “{name}”', 'vehicle.name': 'Name',
    'vehicle.namePlaceholder': 'Golf, Julie’s car…', 'vehicle.engine': 'Engine',
    'vehicle.locked': 'Locked: this vehicle already has fill-ups.', 'vehicle.tank': 'Tank capacity',
    'vehicle.fuels': 'Fuels offered',
    'vehicle.fuelsHint': 'Untick the ones you never use: they disappear from the lists and the simulator.',
    'vehicle.allFuels': 'Show fuels from other countries', 'vehicle.defaultFuel': 'Default fuel',
    'vehicle.lastUsed': 'Last used', 'vehicle.active': 'Active', 'vehicle.tankBadge': '{value} tank',
    'vehicle.errName': 'Give the vehicle a name.', 'vehicle.errDuplicate': 'A vehicle already has this name.',
    'vehicle.errTank': 'The tank capacity must be a number of {unit}.',
    'vehicle.errFuels': 'Keep at least one fuel offered.',
    'vehicle.added': '“{name}” added and selected', 'vehicle.updated': 'Vehicle updated',
    'vehicle.confirmDelete': 'Delete “{name}” and its {fills} and {expenses}?\n\nThis cannot be undone.',
    'vehicle.deleted': '“{name}” deleted', 'vehicle.defaultName': 'My car',
    'count.fills.one': '{n} fill-up', 'count.fills.other': '{n} fill-ups',
    'count.expenses.one': '{n} expense', 'count.expenses.other': '{n} expenses',
    'count.vehicles.one': '{n} vehicle', 'count.vehicles.other': '{n} vehicles',
    'summary.vehicles.one': 'vehicle', 'summary.vehicles.other': 'vehicles',
    'summary.fills.one': 'fill-up', 'summary.fills.other': 'fill-ups', 'summary.expenses.one': 'expense', 'summary.expenses.other': 'expenses',

    'settings.region': 'Language and country', 'settings.language': 'Language', 'settings.country': 'Country',
    'settings.countryHint': 'The country sets the names and the list of fuels offered.',
    'settings.applyRegion': 'Also use this country’s currency and units?\n\n{details}',
    'country.FR': 'France', 'country.BE': 'Belgium', 'country.LU': 'Luxembourg', 'country.CH': 'Switzerland',
    'country.CA': 'Canada', 'country.GB': 'United Kingdom', 'country.IE': 'Ireland', 'country.US': 'United States',
    'country.DE': 'Germany', 'country.AT': 'Austria', 'country.OTHER': 'Other country',
    'settings.appearance': 'Appearance', 'settings.theme': 'Theme', 'theme.auto': 'Automatic', 'theme.light': 'Light',
    'theme.dark': 'Dark', 'settings.themeHint': '“Automatic” follows the light / dark setting of your phone.',
    'settings.color': 'Colour', 'accent.teal': 'Teal', 'accent.blue': 'Blue', 'accent.violet': 'Violet',
    'accent.rose': 'Pink', 'accent.orange': 'Orange', 'accent.green': 'Green',
    'settings.textSize': 'Text size', 'text.small': 'Small', 'text.normal': 'Normal', 'text.large': 'Large',
    'settings.density': 'Display density', 'density.normal': 'Normal', 'density.compact': 'Compact',
    'settings.densityHint': '“Compact” reduces margins to show more information on screen.',
    'settings.units': 'Units', 'settings.conso': 'Consumption', 'settings.distance': 'Distance', 'settings.volume': 'Volume',
    'settings.currency': 'Currency', 'settings.priceDecimals': 'Price decimals',
    'dist.km': 'km', 'dist.mi': 'Miles', 'vol.L': 'Litres', 'vol.gal': 'Gallons (US)',
    'dec.2': '2 decimals', 'dec.3': '3 decimals',
    'currency.EUR': 'Euro (€)', 'currency.CHF': 'Swiss franc (CHF)', 'currency.GBP': 'Pound sterling (£)',
    'currency.USD': 'US dollar ($)', 'currency.CAD': 'Canadian dollar ($)',
    'settings.unitsHint': 'Changing units does not change your data: only the display is converted. Excel exports stay in km, litres and L/100 km.',
    'settings.nav': 'Navigation and input', 'settings.startTab': 'Start screen', 'settings.tabs': 'Visible tabs',
    'settings.tabsHint': 'Hide the tabs you don’t use. Expenses already entered still count in the stats.',
    'settings.defaultFull': '“Full tank” on by default', 'settings.defaultFullHint': 'Turn off if you mostly do partial fill-ups.',
    'settings.fuels': 'Fuels', 'settings.e85': 'E85 ethanol content',
    'settings.e85Hint': 'The real content varies with the season and the station (65 to 85%). It is used to compute the ethanol content of your blends and the simulator estimates.',
    'settings.e85Toast': 'E85: {n}% ethanol',
    'settings.decrease': 'Decrease', 'settings.increase': 'Increase',

    'data.title': 'Data', 'data.leadWeb': 'Everything is stored only in this browser, on this device.',
    'data.leadApp': 'Everything is stored only in the app, on this phone.',
    'data.androidTitle': 'Automatic Android backup',
    'data.androidText': 'Your vehicles, fill-ups, expenses and settings are included in your <strong>phone’s Google backup</strong> (on your Google Drive). They come back automatically if you reinstall the app or switch phones with the same Google account.',
    'data.androidHint': 'Check in Android settings › Google › Backup that backup is turned on. It runs about once a day, while the phone is charging and on Wi-Fi.',
    'data.backupTitle': 'Full backup',
    'data.backupText': 'A file with <strong>all your vehicles, fill-ups and expenses</strong> (recurring ones included). Keep it somewhere safe (computer, cloud, email…): it restores everything, even on another phone.',
    'data.download': 'Download backup', 'data.share': 'Save / send backup',
    'data.restore': 'Restore from a file', 'data.restoreHint': 'Restoring replaces the current fill-ups and expenses.',
    'data.excelTitle': 'Excel export',
    'data.excelText': 'To browse or rework your figures in a spreadsheet. These files cannot be used to restore the app.',
    'data.csvFills': 'Fill-ups', 'data.csvFillsSub': 'Date, odometer, litres, price, consumption… (.csv)',
    'data.csvExpenses': 'Expenses', 'data.csvExpensesSub': 'One row per payment, recurring ones included (.csv)',
    'data.clearTitle': 'Erase everything',
    'data.clearText': 'Permanently deletes the fill-ups and expenses of all vehicles. Vehicles and settings are kept. Download a backup first.',
    'data.clearButton': 'Erase all fill-ups and expenses',
    'backup.none': 'No backup downloaded yet.', 'backup.today': 'today', 'backup.yesterday': 'yesterday',
    'backup.daysAgo': '{n} days ago', 'backup.last': 'Last backup: {when} ({date}).',
    'backup.downloaded': 'Backup downloaded', 'restore.error': 'Cannot restore: {msg}',
    'restore.confirmFull': 'Restore {vehicles}, {fills} and {expenses}?\n\nAll current vehicles, fill-ups and expenses will be replaced.',
    'restore.confirmOld': 'This old backup has no vehicle.\n\nRestore {fills} and {expenses} into “{name}”? The current fill-ups and expenses of this vehicle will be replaced.',
    'restore.done': 'Backup restored',
    'clear.confirm': 'Permanently erase all fill-ups and expenses of all vehicles?\n\nVehicles and settings are kept.',
    'clear.done': 'All fill-ups and expenses have been erased',
    'export.dialog': 'Save or send', 'export.error': 'Export failed: {msg}',
    'import.unreadable': 'unreadable JSON file.', 'import.notBackup': 'this file is not a CarConso backup.',
    'import.invalid': '{n} invalid item(s) in the file.', 'import.noVehicle': 'no vehicle in the file.',
    'import.unknownVehicle': 'some fill-ups or expenses belong to an unknown vehicle.',
    'file.backup': 'carconso-backup', 'file.fills': 'carconso-fillups', 'file.expenses': 'carconso-expenses',
    'csv.fills': 'vehicle|date|odometer_km|distance_km|full_tank|fuels|litres|total|price_per_litre|ethanol_pct|consumption_l100',
    'csv.expenses': 'vehicle|date|category|amount|recurrence|note', 'csv.yes': 'yes', 'csv.no': 'no',

    'about.title': 'About', 'about.source': 'Source code on GitHub',
    'about.sourceSub': 'Free software (GPL v3): browse the code, report an issue…',
    'about.privacy': 'Privacy', 'about.privacySub': 'No data collected: everything stays on your device.',
    'about.offline': 'works offline', 'about.credits': 'Built with help from Claude (Anthropic)',
    'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
  },
};

// t('key', { name: 'x' }) → translated text with {name} replaced.
function t(key, params = {}) {
  const text = MESSAGES[LANG][key] ?? MESSAGES.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (m, name) => (name in params ? params[name] : m));
}

// Plural: French uses the singular for 0 and 1, English only for 1.
function tn(key, n, params = {}) {
  const one = LANG === 'fr' ? n < 2 : n === 1;
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
