// Dutch texts. Every key must exist in all the locales/*.js files.

FUEL_NAMES.nl = {
  E5: 'Euro 95 (E5)',
  E10: 'Euro 95 (E10)',
  SP95P: 'Premium 95',
  SP98: 'Super Plus 98',
  SP98P: 'Premium 98',
  REG: 'Regular',
  MID: 'Midgrade',
  PREM: 'Premium',
  E85: 'E85',
  B7: 'Diesel',
  B7P: 'Premium diesel',
  E27: 'Benzine E27',
  E100: 'Ethanol E100',
};

MESSAGES.nl = {
  'common.save': 'Opslaan', 'common.update': 'Bijwerken', 'common.cancel': 'Annuleren',
  'common.delete': 'Verwijderen', 'common.add': 'Toevoegen', 'common.date': 'Datum', 'common.optional': '(optioneel)',
  'common.or': 'of', 'common.unknownError': 'onbekende fout',

  'nav.add': 'Tanken', 'nav.history': 'Geschiedenis', 'nav.expenses': 'Kosten', 'nav.stats': 'Statistieken',
  'nav.settings': 'Instellingen', 'topbar.vehicle': 'Voertuig',

  'fill.new': 'Nieuwe tankbeurt', 'fill.edit': 'Tankbeurt bewerken', 'fill.odometer': 'Kilometerstand',
  'fill.distance': 'Afgelegde afstand', 'fill.full': 'Volle tank',
  'fill.fullHint': 'Tank tot de rand gevuld. Zet uit voor een gedeeltelijke tankbeurt.',
  'fill.fuel': 'Brandstof', 'fill.addFuel': 'Brandstof toevoegen (mengsel)', 'fill.fuelType': 'Soort brandstof',
  'fill.volume.L': 'Liter', 'fill.volume.gal': 'Gallon', 'fill.totalPrice': 'Totaalprijs',
  'fill.removeFuel': 'Deze brandstof verwijderen', 'fill.confirmDelete': 'Deze tankbeurt verwijderen?',

  'odo.previous': 'Kilometerstand bij de vorige tankbeurt: {value}',
  'odo.unknown': 'Kilometerstand van de vorige tankbeurt onbekend: vul ook de afstand in.',
  'odo.first': 'Eerste tankbeurt: die dient als referentie, de afstand is optioneel. Noteer de kilometerstand om de volgende te berekenen.',

  'preview.total': 'Totaal', 'preview.amount': 'Bedrag', 'preview.price': 'Prijs {per}', 'preview.ethanol': 'Ethanol',
  'preview.cost': 'Ritkosten {per100}', 'preview.mix': 'Mengsel',
  'preview.conso': 'Verbruik van de tankbeurt van {date}',

  'err.date': 'Vul de datum van de tankbeurt in.', 'err.odoNumber': 'De kilometerstand moet een aantal {unit} zijn.',
  'err.odoPrevious': 'De kilometerstand moet hoger zijn dan bij de vorige tankbeurt ({value}).',
  'err.distance': 'Vul de kilometerstand of de afstand sinds de vorige tankbeurt in.',
  'err.volume': 'Vul de hoeveelheid per brandstof in.', 'err.total': 'Vul de betaalde totaalprijs per brandstof in.',
  'err.duplicateFuel': 'Elke brandstof mag maar één keer voorkomen.',
  'err.mixFamilies': 'Benzine en diesel kunnen niet gemengd worden.',

  'toast.fillSaved': 'Tankbeurt opgeslagen', 'toast.fillUpdated': 'Tankbeurt bijgewerkt', 'toast.partialSaved': 'Gedeeltelijke tankbeurt opgeslagen',
  'toast.fillConso': '{title} — tankbeurt van {date}: {conso}',
  'toast.fillLater': '{title} — verbruik berekend bij de volgende volle tank',
  'toast.fillDeleted': 'Tankbeurt verwijderd', 'toast.saveError': 'Fout: de gegevens konden niet worden opgeslagen',
  'toast.vehicle': 'Voertuig: {name}',

  'history.title': 'Geschiedenis', 'history.lead': 'Tik op een tankbeurt om die te bewerken.',
  'history.empty': 'Geen tankbeurt voor dit voertuig.', 'history.current': 'lopend', 'history.partial': 'Gedeeltelijk',
  'history.odometer': 'Kilometerstand: {value}',

  'mix.share': '{pct}% {name}', 'mix.group': 'Mengsel {names}',

  'family.essence': 'Benzine', 'family.diesel': 'Diesel',

  'category.entretien': 'Onderhoud / olie verversen', 'category.pneus': 'Banden', 'category.reparation': 'Reparatie',
  'category.assurance': 'Verzekering', 'category.controle': 'Keuring (APK)', 'category.peage': 'Tol',
  'category.parking': 'Parkeren', 'category.lavage': 'Wasstraat', 'category.autre': 'Overig',

  'rec.monthly': 'Elke maand', 'rec.quarterly': 'Elke 3 maanden', 'rec.semiannual': 'Elke 6 maanden', 'rec.yearly': 'Elk jaar',
  'recShort.monthly': 'Maandelijks', 'recShort.quarterly': 'Per kwartaal', 'recShort.semiannual': 'Halfjaarlijks', 'recShort.yearly': 'Jaarlijks',
  'recPer.monthly': '/maand', 'recPer.quarterly': '/kwartaal', 'recPer.semiannual': '/halfjaar', 'recPer.yearly': '/jaar',

  'exp.new': 'Nieuwe uitgave', 'exp.edit': 'Uitgave bewerken', 'exp.lead': 'Onderhoud, verzekering, tol… eenmalig of terugkerend.',
  'exp.category': 'Categorie', 'exp.amount': 'Bedrag', 'exp.note': 'Notitie', 'exp.notePlaceholder': 'Olie + oliefilter vervangen',
  'exp.repeat': 'Herhaling', 'exp.until': 'Tot', 'exp.none': 'Geen (eenmalige uitgave)',
  'exp.recHint': '{rec} vanaf {date}. Eerdere betalingen worden automatisch meegeteld in de statistieken.',
  'exp.since': 'Sinds {date}', 'exp.sinceUntil': 'Van {date} tot {end}',
  'exp.payments.one': '{n} betaling: {amount}', 'exp.payments.other': '{n} betalingen: {amount}',
  'exp.next': 'volgende op {date}', 'exp.ended': 'beëindigd', 'exp.empty': 'Geen uitgave voor dit voertuig.',
  'exp.recurring': 'Terugkerend', 'exp.oneOff': 'Eenmalig',
  'exp.errDate': 'Vul de datum in.', 'exp.errAmount': 'Vul het bedrag in.',
  'exp.errEnd': 'De einddatum moet na de begindatum liggen.',
  'exp.updated': 'Uitgave bijgewerkt', 'exp.addedRec': 'Terugkerende uitgave toegevoegd: {amount} {per}', 'exp.added': 'Uitgave toegevoegd: {amount}',
  'exp.confirmDeleteRec': 'Deze terugkerende uitgave en al haar betalingen verwijderen? Om ze alleen te stoppen, vul je beter een einddatum in.',
  'exp.confirmDelete': 'Deze uitgave verwijderen?', 'exp.deleted': 'Uitgave verwijderd',

  'stats.title': 'Statistieken', 'stats.empty': 'Nog geen verbruik in deze periode: er zijn minstens twee volle tankbeurten nodig.',
  'stats.consoChart': 'Verbruik per tankbeurt', 'stats.byFuel': 'Per brandstof / mengsel', 'stats.priceChart': 'Prijs {per}',
  'stats.monthly': 'Uitgaven per maand', 'stats.byCategory': 'Kosten per categorie', 'stats.forecast': 'Prognose',
  'stats.avg': 'Gemiddeld verbruik', 'stats.autonomy': 'Actieradius ≈ {dist} (tank van {tank})',
  'stats.last': 'Laatste', 'stats.best': 'Beste', 'stats.worst': 'Slechtste',
  'stats.noExpense': 'Geen kosten in deze periode.',

  'period.label': 'Periode', 'period.1': '1 maand', 'period.3': '3 maanden', 'period.12': '1 jaar', 'period.all': 'Alles',

  'card.avgPrice': 'Gemiddelde prijs', 'card.fuelPer': 'Brandstof per {unit}', 'card.totalPer': 'Totale kosten per {unit}',
  'card.fuelAndExpenses': 'brandstof + kosten', 'card.distance': 'Afstand', 'card.used': '{volume} getankt',
  'card.fuel': 'Brandstof', 'card.expenses': 'Kosten', 'card.expensesSub': 'onderhoud, verzekering…',

  'th.fuel': 'Brandstof', 'th.conso': 'Verbr.', 'th.fills': 'Tankb.', 'th.spent': 'Uitgegeven', 'th.avgPrice': 'Gem. prijs',
  'th.category': 'Categorie', 'th.count': 'Aantal', 'th.total': 'Totaal', 'th.price': 'Prijs',

  'chart.fuel': 'Brandstof', 'chart.expenses': 'Kosten',

  'fc.fuel': 'Brandstof / maand', 'fc.months.one': 'over {n} maand', 'fc.months.other': 'over {n} maanden',
  'fc.expenses': 'Kosten / maand', 'fc.inclRecurring': 'incl. terugkerende', 'fc.km': 'Km per maand', 'fc.mi': 'Mijl per maand',
  'fc.budget': 'Jaarbudget', 'fc.empty': 'De prognose verschijnt na een eerste volledige maand aan gegevens.',

  'unit.km': 'km', 'unit.mile': 'mijl', 'unit.perL': 'per liter', 'unit.perGal': 'per gallon',

  'settings.title': 'Instellingen', 'settings.vehicles': 'Mijn voertuigen', 'settings.addVehicle': 'Voertuig toevoegen',

  'vehicle.new': 'Nieuw voertuig', 'vehicle.edit': '‘{name}’ bewerken', 'vehicle.name': 'Naam',
  'vehicle.namePlaceholder': 'Polo, de auto van Julia…', 'vehicle.engine': 'Motor',
  'vehicle.locked': 'Vergrendeld: dit voertuig heeft al tankbeurten.', 'vehicle.tank': 'Tankinhoud',
  'vehicle.fuels': 'Aangeboden brandstoffen',
  'vehicle.fuelsHint': 'Vink uit wat je nooit gebruikt: die verdwijnen uit de lijsten.',
  'vehicle.allFuels': 'Brandstoffen uit andere landen tonen', 'vehicle.defaultFuel': 'Standaardbrandstof',
  'vehicle.lastUsed': 'De laatst gebruikte', 'vehicle.active': 'Actief', 'vehicle.tankBadge': 'Tank {value}',
  'vehicle.errName': 'Geef het voertuig een naam.', 'vehicle.errDuplicate': 'Er is al een voertuig met deze naam.',
  'vehicle.errTank': 'De tankinhoud moet een aantal {unit} zijn.',
  'vehicle.errFuels': 'Houd minstens één brandstof aan.',
  'vehicle.added': '‘{name}’ toegevoegd en geselecteerd', 'vehicle.updated': 'Voertuig bijgewerkt',
  'vehicle.confirmDelete': '‘{name}’ met zijn {fills} en {expenses} verwijderen?\n\nDit kan niet ongedaan worden gemaakt.',
  'vehicle.deleted': '‘{name}’ verwijderd', 'vehicle.defaultName': 'Mijn auto',

  'count.fills.one': '{n} tankbeurt', 'count.fills.other': '{n} tankbeurten',
  'count.expenses.one': '{n} uitgave', 'count.expenses.other': '{n} uitgaven',
  'count.vehicles.one': '{n} voertuig', 'count.vehicles.other': '{n} voertuigen',

  'summary.vehicles.one': 'voertuig', 'summary.vehicles.other': 'voertuigen',
  'summary.fills.one': 'tankbeurt', 'summary.fills.other': 'tankbeurten',
  'summary.expenses.one': 'uitgave', 'summary.expenses.other': 'uitgaven',

  'settings.region': 'Taal en land', 'settings.language': 'Taal', 'settings.country': 'Land',
  'settings.countryHint': 'Het land bepaalt de namen en de lijst van aangeboden brandstoffen.',
  'settings.applyRegion': 'Ook de munteenheid en de eenheden van dit land gebruiken?\n\n{details}',

  'country.FR': 'Frankrijk', 'country.BE': 'België', 'country.LU': 'Luxemburg', 'country.CH': 'Zwitserland',
  'country.CA': 'Canada', 'country.GB': 'Verenigd Koninkrijk', 'country.IE': 'Ierland', 'country.US': 'Verenigde Staten',
  'country.DE': 'Duitsland', 'country.AT': 'Oostenrijk', 'country.ES': 'Spanje', 'country.IT': 'Italië',
  'country.PT': 'Portugal', 'country.NL': 'Nederland', 'country.MX': 'Mexico', 'country.BR': 'Brazilië',
  'country.OTHER': 'Ander land',

  'settings.appearance': 'Weergave', 'settings.theme': 'Thema',
  'theme.auto': 'Automatisch', 'theme.light': 'Licht', 'theme.dark': 'Donker',
  'settings.themeHint': '‘Automatisch’ volgt de licht- / donkerinstelling van je telefoon.',
  'settings.color': 'Kleur',
  'accent.teal': 'Turquoise', 'accent.blue': 'Blauw', 'accent.violet': 'Paars',
  'accent.rose': 'Roze', 'accent.orange': 'Oranje', 'accent.green': 'Groen',
  'settings.textSize': 'Tekstgrootte', 'text.small': 'Klein', 'text.normal': 'Normaal', 'text.large': 'Groot',
  'settings.density': 'Weergavedichtheid', 'density.normal': 'Normaal', 'density.compact': 'Compact',
  'settings.densityHint': '‘Compact’ verkleint de marges om meer informatie op het scherm te tonen.',
  'settings.units': 'Eenheden', 'settings.conso': 'Verbruik', 'settings.distance': 'Afstand', 'settings.volume': 'Volume',
  'settings.currency': 'Munteenheid', 'settings.priceDecimals': 'Decimalen van prijzen',

  'dist.km': 'km', 'dist.mi': 'Mijl', 'vol.L': 'Liter', 'vol.gal': 'Gallon (VS)',
  'dec.2': '2 decimalen', 'dec.3': '3 decimalen',

  'currency.EUR': 'Euro (€)', 'currency.CHF': 'Zwitserse frank (CHF)', 'currency.GBP': 'Brits pond (£)',
  'currency.USD': 'Amerikaanse dollar ($)', 'currency.CAD': 'Canadese dollar ($)',
  'currency.MXN': 'Mexicaanse peso ($)', 'currency.BRL': 'Braziliaanse real (R$)',

  'settings.unitsHint': 'Een andere eenheid verandert je gegevens niet: alleen de weergave wordt omgerekend. Excel-exports blijven in km, liter en L/100 km.',
  'settings.nav': 'Navigatie en invoer', 'settings.startTab': 'Startscherm', 'settings.tabs': 'Zichtbare tabbladen',
  'settings.tabsHint': 'Verberg de tabbladen die je niet gebruikt. Al ingevoerde kosten tellen nog mee in de statistieken.',
  'settings.defaultFull': '‘Volle tank’ standaard aan', 'settings.defaultFullHint': 'Zet uit als je meestal gedeeltelijk tankt.',
  'settings.fuels': 'Brandstoffen', 'settings.e85': 'Ethanolgehalte van E85',
  'settings.e85Hint': 'Het echte gehalte verschilt per seizoen en tankstation (65 tot 85%). Het dient om het ethanolgehalte van je mengsels te berekenen.',
  'settings.e85Toast': 'E85: {n}% ethanol',
  'settings.decrease': 'Verlagen', 'settings.increase': 'Verhogen',

  'data.title': 'Gegevens', 'data.leadWeb': 'Alles wordt alleen in deze browser op dit apparaat bewaard.',
  'data.leadApp': 'Alles wordt alleen in de app op deze telefoon bewaard.',
  'data.androidTitle': 'Automatische Android-back-up',
  'data.androidText': 'Je voertuigen, tankbeurten, kosten en instellingen zitten in de <strong>Google-back-up van je telefoon</strong> (op je Google Drive). Ze komen automatisch terug als je de app opnieuw installeert of van telefoon wisselt met hetzelfde Google-account.',
  'data.androidHint': 'Controleer in Android-instellingen › Google › Back-up dat de back-up aan staat. Die gebeurt ongeveer één keer per dag, als de telefoon oplaadt en op wifi zit.',
  'data.backupTitle': 'Volledige back-up',
  'data.backupText': 'Een bestand met <strong>al je voertuigen, tankbeurten en kosten</strong> (ook terugkerende). Bewaar het op een veilige plek (computer, cloud, e-mail…): hiermee zet je alles terug, ook op een andere telefoon.',
  'data.download': 'Back-up downloaden', 'data.share': 'Back-up opslaan / versturen',
  'data.restore': 'Terugzetten uit een bestand', 'data.restoreHint': 'Terugzetten vervangt de huidige tankbeurten en kosten.',
  'data.excelTitle': 'Excel-export',
  'data.excelText': 'Om je cijfers in een spreadsheet te bekijken of te bewerken. Deze bestanden kunnen niet worden gebruikt om de app terug te zetten.',
  'data.csvFills': 'Tankbeurten', 'data.csvFillsSub': 'Datum, kilometerstand, liters, prijs, verbruik… (.csv)',
  'data.csvExpenses': 'Kosten', 'data.csvExpensesSub': 'Eén regel per betaling, ook terugkerende (.csv)',
  'data.clearTitle': 'Alles wissen',
  'data.clearText': 'Verwijdert definitief de tankbeurten en kosten van alle voertuigen. Voertuigen en instellingen blijven bewaard. Download eerst een back-up.',
  'data.clearButton': 'Alle tankbeurten en kosten wissen',

  'backup.none': 'Nog geen back-up gedownload.', 'backup.today': 'vandaag', 'backup.yesterday': 'gisteren',
  'backup.daysAgo': '{n} dagen geleden', 'backup.last': 'Laatste back-up: {when} ({date}).',
  'backup.downloaded': 'Back-up gedownload',

  'restore.error': 'Terugzetten niet mogelijk: {msg}',
  'restore.confirmFull': '{vehicles}, {fills} en {expenses} terugzetten?\n\nAlle huidige voertuigen, tankbeurten en kosten worden vervangen.',
  'restore.confirmOld': 'Deze oude back-up bevat geen voertuig.\n\n{fills} en {expenses} terugzetten in ‘{name}’? De huidige tankbeurten en kosten van dit voertuig worden vervangen.',
  'restore.done': 'Back-up teruggezet',

  'clear.confirm': 'Alle tankbeurten en kosten van alle voertuigen definitief wissen?\n\nVoertuigen en instellingen blijven bewaard.',
  'clear.done': 'Alle tankbeurten en kosten zijn gewist',

  'export.dialog': 'Opslaan of versturen', 'export.error': 'Exporteren mislukt: {msg}',

  'import.unreadable': 'onleesbaar JSON-bestand.', 'import.notBackup': 'dit bestand is geen CarConso-back-up.',
  'import.invalid': '{n} ongeldig(e) item(s) in het bestand.', 'import.noVehicle': 'geen voertuig in het bestand.',
  'import.unknownVehicle': 'sommige tankbeurten of kosten horen bij een onbekend voertuig.',

  'file.backup': 'carconso-backup', 'file.fills': 'carconso-tankbeurten', 'file.expenses': 'carconso-kosten',

  'csv.fills': 'voertuig|datum|kilometerstand_km|afstand_km|volle_tank|brandstoffen|liter|totaal|prijs_per_liter|ethanol_pct|verbruik_l100',
  'csv.expenses': 'voertuig|datum|categorie|bedrag|herhaling|notitie', 'csv.yes': 'ja', 'csv.no': 'nee',

  'about.title': 'Over', 'about.source': 'Broncode op GitHub',
  'about.sourceSub': 'Vrije software (GPL v3): bekijk de code, meld een probleem…',
  'about.privacy': 'Privacy', 'about.privacySub': 'Geen gegevens verzameld: alles blijft op je apparaat.',
  'about.offline': 'werkt offline', 'about.credits': 'Ontwikkeld met hulp van Claude (Anthropic)',
  'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
};
