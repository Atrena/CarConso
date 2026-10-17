// German texts. Every key must exist in all the locales/*.js files.

FUEL_NAMES.de = {
  E5: 'Super 95 (E5)',
  E10: 'Super 95 (E10)',
  SP95P: 'Premium 95',
  SP98: 'Super Plus 98',
  SP98P: 'Premium 98',
  REG: 'Regular',
  MID: 'Midgrade',
  PREM: 'Premium',
  E85: 'E85',
  B7: 'Diesel',
  B7P: 'Premium-Diesel',
  E27: 'Benzin E27',
  E100: 'Ethanol E100',
};

MESSAGES.de = {
  'common.save': 'Speichern', 'common.update': 'Aktualisieren', 'common.cancel': 'Abbrechen',
  'common.delete': 'Löschen', 'common.add': 'Hinzufügen', 'common.date': 'Datum', 'common.optional': '(optional)',
  'common.or': 'oder', 'common.unknownError': 'unbekannter Fehler',

  'nav.add': 'Tanken', 'nav.history': 'Verlauf', 'nav.expenses': 'Kosten', 'nav.stats': 'Statistik',
  'nav.settings': 'Einstellungen', 'topbar.vehicle': 'Fahrzeug',

  'fill.new': 'Neue Tankfüllung', 'fill.edit': 'Tankfüllung bearbeiten', 'fill.odometer': 'Kilometerstand',
  'fill.distance': 'Gefahrene Strecke', 'fill.full': 'Vollgetankt',
  'fill.fullHint': 'Tank bis zum Rand gefüllt. Ausschalten bei Teilbetankung.',
  'fill.fuel': 'Kraftstoff', 'fill.addFuel': 'Kraftstoff hinzufügen (Mischung)', 'fill.fuelType': 'Kraftstoffart',
  'fill.volume.L': 'Liter', 'fill.volume.gal': 'Gallonen', 'fill.totalPrice': 'Gesamtpreis',
  'fill.removeFuel': 'Diesen Kraftstoff entfernen', 'fill.confirmDelete': 'Diese Tankfüllung löschen?',

  'odo.previous': 'Kilometerstand beim letzten Tanken: {value}',
  'odo.unknown': 'Kilometerstand beim letzten Tanken unbekannt: gib auch die Strecke ein.',
  'odo.first': 'Erste Tankfüllung: Sie dient als Referenz, die Strecke ist optional. Notiere den Kilometerstand, um die nächsten zu berechnen.',

  'preview.total': 'Gesamt', 'preview.amount': 'Betrag', 'preview.price': 'Preis {per}', 'preview.ethanol': 'Ethanol',
  'preview.cost': 'Fahrtkosten {per100}', 'preview.mix': 'Mischung',
  'preview.conso': 'Verbrauch der Tankfüllung vom {date}',

  'err.date': 'Gib das Datum der Tankfüllung ein.', 'err.odoNumber': 'Der Kilometerstand muss eine Zahl in {unit} sein.',
  'err.odoPrevious': 'Der Kilometerstand muss höher sein als beim letzten Tanken ({value}).',
  'err.distance': 'Gib den Kilometerstand oder die Strecke seit dem letzten Tanken ein.',
  'err.volume': 'Gib die Menge für jeden Kraftstoff ein.', 'err.total': 'Gib den bezahlten Gesamtpreis für jeden Kraftstoff ein.',
  'err.duplicateFuel': 'Jeder Kraftstoff darf nur einmal vorkommen.',
  'err.mixFamilies': 'Benzin und Diesel können nicht gemischt werden.',

  'toast.fillSaved': 'Tankfüllung gespeichert', 'toast.fillUpdated': 'Tankfüllung aktualisiert', 'toast.partialSaved': 'Teilbetankung gespeichert',
  'toast.fillConso': '{title} – Tankfüllung vom {date}: {conso}',
  'toast.fillLater': '{title} – Verbrauch wird beim nächsten Volltanken berechnet',
  'toast.fillDeleted': 'Tankfüllung gelöscht', 'toast.saveError': 'Fehler: Die Daten konnten nicht gespeichert werden',
  'toast.vehicle': 'Fahrzeug: {name}',

  'history.title': 'Verlauf', 'history.lead': 'Tippe auf eine Tankfüllung, um sie zu bearbeiten.',
  'history.empty': 'Keine Tankfüllung für dieses Fahrzeug.', 'history.current': 'läuft', 'history.partial': 'Teilweise',
  'history.odometer': 'Kilometerstand: {value}',

  'mix.share': '{pct} % {name}', 'mix.group': 'Mischung {names}',

  'family.essence': 'Benzin', 'family.diesel': 'Diesel',

  'category.entretien': 'Wartung / Ölwechsel', 'category.pneus': 'Reifen', 'category.reparation': 'Reparatur',
  'category.assurance': 'Versicherung', 'category.controle': 'Hauptuntersuchung (TÜV)', 'category.peage': 'Maut',
  'category.parking': 'Parken', 'category.lavage': 'Autowäsche', 'category.autre': 'Sonstiges',

  'rec.monthly': 'Jeden Monat', 'rec.quarterly': 'Alle 3 Monate', 'rec.semiannual': 'Alle 6 Monate', 'rec.yearly': 'Jedes Jahr',
  'recShort.monthly': 'Monatlich', 'recShort.quarterly': 'Vierteljährlich', 'recShort.semiannual': 'Halbjährlich', 'recShort.yearly': 'Jährlich',
  'recPer.monthly': '/Monat', 'recPer.quarterly': '/Quartal', 'recPer.semiannual': '/Halbjahr', 'recPer.yearly': '/Jahr',

  'exp.new': 'Neue Ausgabe', 'exp.edit': 'Ausgabe bearbeiten', 'exp.lead': 'Wartung, Versicherung, Maut… einmalig oder regelmäßig.',
  'exp.category': 'Kategorie', 'exp.amount': 'Betrag', 'exp.note': 'Notiz', 'exp.notePlaceholder': 'Ölwechsel + Ölfilter',
  'exp.repeat': 'Wiederholung', 'exp.until': 'Bis', 'exp.none': 'Keine (einmalige Ausgabe)',
  'exp.recHint': '{rec} ab dem {date}. Vergangene Zahlungen werden automatisch in der Statistik berücksichtigt.',
  'exp.since': 'Seit dem {date}', 'exp.sinceUntil': 'Vom {date} bis zum {end}',
  'exp.payments.one': '{n} Zahlung: {amount}', 'exp.payments.other': '{n} Zahlungen: {amount}',
  'exp.next': 'nächste am {date}', 'exp.ended': 'beendet', 'exp.empty': 'Keine Ausgabe für dieses Fahrzeug.',
  'exp.recurring': 'Regelmäßig', 'exp.oneOff': 'Einmalig',
  'exp.errDate': 'Gib das Datum ein.', 'exp.errAmount': 'Gib den Betrag ein.',
  'exp.errEnd': 'Das Enddatum muss nach dem Startdatum liegen.',
  'exp.updated': 'Ausgabe aktualisiert', 'exp.addedRec': 'Regelmäßige Ausgabe hinzugefügt: {amount} {per}', 'exp.added': 'Ausgabe hinzugefügt: {amount}',
  'exp.confirmDeleteRec': 'Diese regelmäßige Ausgabe und alle ihre Zahlungen löschen? Um sie nur zu beenden, gib lieber ein Enddatum ein.',
  'exp.confirmDelete': 'Diese Ausgabe löschen?', 'exp.deleted': 'Ausgabe gelöscht',

  'stats.title': 'Statistik', 'stats.empty': 'Noch kein Verbrauch in diesem Zeitraum: Es braucht mindestens zwei volle Tankfüllungen.',
  'stats.consoChart': 'Verbrauch pro Tankfüllung', 'stats.byFuel': 'Nach Kraftstoff / Mischung', 'stats.priceChart': 'Preis {per}',
  'stats.monthly': 'Ausgaben pro Monat', 'stats.byCategory': 'Kosten nach Kategorie', 'stats.forecast': 'Prognose',
  'stats.avg': 'Durchschnittsverbrauch', 'stats.autonomy': 'Reichweite ≈ {dist} ({tank} Tank)',
  'stats.last': 'Letzter', 'stats.best': 'Bester', 'stats.worst': 'Schlechtester',
  'stats.noExpense': 'Keine Kosten in diesem Zeitraum.',

  'period.label': 'Zeitraum', 'period.1': '1 Monat', 'period.3': '3 Monate', 'period.12': '1 Jahr', 'period.all': 'Alles',

  'card.avgPrice': 'Durchschnittspreis', 'card.fuelPer': 'Kraftstoff pro {unit}', 'card.totalPer': 'Gesamtkosten pro {unit}',
  'card.fuelAndExpenses': 'Kraftstoff + Kosten', 'card.distance': 'Strecke', 'card.used': '{volume} getankt',
  'card.fuel': 'Kraftstoff', 'card.expenses': 'Kosten', 'card.expensesSub': 'Wartung, Versicherung…',

  'th.fuel': 'Kraftstoff', 'th.conso': 'Verbr.', 'th.fills': 'Tankf.', 'th.spent': 'Ausgaben', 'th.avgPrice': 'Ø Preis',
  'th.category': 'Kategorie', 'th.count': 'Anzahl', 'th.total': 'Gesamt', 'th.price': 'Preis',

  'chart.fuel': 'Kraftstoff', 'chart.expenses': 'Kosten',

  'fc.fuel': 'Kraftstoff / Monat', 'fc.months.one': 'über {n} Monat', 'fc.months.other': 'über {n} Monate',
  'fc.expenses': 'Kosten / Monat', 'fc.inclRecurring': 'inkl. regelmäßiger', 'fc.km': 'Km pro Monat', 'fc.mi': 'Meilen pro Monat',
  'fc.budget': 'Jahresbudget', 'fc.empty': 'Die Prognose erscheint nach einem ersten vollen Monat mit Daten.',

  'unit.km': 'km', 'unit.mile': 'Meile', 'unit.perL': 'pro Liter', 'unit.perGal': 'pro Gallone',

  'settings.title': 'Einstellungen', 'settings.vehicles': 'Meine Fahrzeuge', 'settings.addVehicle': 'Fahrzeug hinzufügen',

  'vehicle.new': 'Neues Fahrzeug', 'vehicle.edit': '„{name}“ bearbeiten', 'vehicle.name': 'Name',
  'vehicle.namePlaceholder': 'Golf, Julias Auto…', 'vehicle.engine': 'Antrieb',
  'vehicle.locked': 'Gesperrt: Für dieses Fahrzeug gibt es bereits Tankfüllungen.', 'vehicle.tank': 'Tankinhalt',
  'vehicle.fuels': 'Angebotene Kraftstoffe',
  'vehicle.fuelsHint': 'Entferne den Haken bei denen, die du nie nutzt: Sie verschwinden aus den Listen.',
  'vehicle.allFuels': 'Kraftstoffe anderer Länder anzeigen', 'vehicle.defaultFuel': 'Standard-Kraftstoff',
  'vehicle.lastUsed': 'Zuletzt verwendet', 'vehicle.active': 'Aktiv', 'vehicle.tankBadge': 'Tank {value}',
  'vehicle.errName': 'Gib dem Fahrzeug einen Namen.', 'vehicle.errDuplicate': 'Es gibt bereits ein Fahrzeug mit diesem Namen.',
  'vehicle.errTank': 'Der Tankinhalt muss eine Zahl in {unit} sein.',
  'vehicle.errFuels': 'Behalte mindestens einen Kraftstoff.',
  'vehicle.added': '„{name}“ hinzugefügt und ausgewählt', 'vehicle.updated': 'Fahrzeug aktualisiert',
  'vehicle.confirmDelete': '„{name}“ mit {fills} und {expenses} löschen?\n\nDas kann nicht rückgängig gemacht werden.',
  'vehicle.deleted': '„{name}“ gelöscht', 'vehicle.defaultName': 'Mein Auto',

  'count.fills.one': '{n} Tankfüllung', 'count.fills.other': '{n} Tankfüllungen',
  'count.expenses.one': '{n} Ausgabe', 'count.expenses.other': '{n} Ausgaben',
  'count.vehicles.one': '{n} Fahrzeug', 'count.vehicles.other': '{n} Fahrzeuge',

  'summary.vehicles.one': 'Fahrzeug', 'summary.vehicles.other': 'Fahrzeuge',
  'summary.fills.one': 'Tankfüllung', 'summary.fills.other': 'Tankfüllungen',
  'summary.expenses.one': 'Ausgabe', 'summary.expenses.other': 'Ausgaben',

  'settings.region': 'Sprache und Land', 'settings.language': 'Sprache', 'settings.country': 'Land',
  'settings.countryHint': 'Das Land bestimmt die Namen und die Liste der angebotenen Kraftstoffe.',
  'settings.applyRegion': 'Auch die Währung und die Einheiten dieses Landes verwenden?\n\n{details}',

  'country.FR': 'Frankreich', 'country.BE': 'Belgien', 'country.LU': 'Luxemburg', 'country.CH': 'Schweiz',
  'country.CA': 'Kanada', 'country.GB': 'Vereinigtes Königreich', 'country.IE': 'Irland', 'country.US': 'Vereinigte Staaten',
  'country.DE': 'Deutschland', 'country.AT': 'Österreich', 'country.ES': 'Spanien', 'country.IT': 'Italien',
  'country.PT': 'Portugal', 'country.NL': 'Niederlande', 'country.MX': 'Mexiko', 'country.BR': 'Brasilien',
  'country.OTHER': 'Anderes Land',

  'settings.appearance': 'Darstellung', 'settings.theme': 'Design',
  'theme.auto': 'Automatisch', 'theme.light': 'Hell', 'theme.dark': 'Dunkel',
  'settings.themeHint': '„Automatisch“ folgt der Hell-/Dunkel-Einstellung deines Telefons.',
  'settings.color': 'Farbe',
  'accent.teal': 'Türkis', 'accent.blue': 'Blau', 'accent.violet': 'Violett',
  'accent.rose': 'Rosa', 'accent.orange': 'Orange', 'accent.green': 'Grün',
  'settings.textSize': 'Textgröße', 'text.small': 'Klein', 'text.normal': 'Normal', 'text.large': 'Groß',
  'settings.density': 'Anzeigedichte', 'density.normal': 'Normal', 'density.compact': 'Kompakt',
  'settings.densityHint': '„Kompakt“ verkleinert die Abstände, um mehr Informationen anzuzeigen.',
  'settings.units': 'Einheiten', 'settings.conso': 'Verbrauch', 'settings.distance': 'Strecke', 'settings.volume': 'Volumen',
  'settings.currency': 'Währung', 'settings.priceDecimals': 'Nachkommastellen der Preise',

  'dist.km': 'km', 'dist.mi': 'Meilen', 'vol.L': 'Liter', 'vol.gal': 'Gallonen (US)',
  'dec.2': '2 Nachkommastellen', 'dec.3': '3 Nachkommastellen',

  'currency.EUR': 'Euro (€)', 'currency.CHF': 'Schweizer Franken (CHF)', 'currency.GBP': 'Britisches Pfund (£)',
  'currency.USD': 'US-Dollar ($)', 'currency.CAD': 'Kanadischer Dollar ($)',
  'currency.MXN': 'Mexikanischer Peso ($)', 'currency.BRL': 'Brasilianischer Real (R$)',

  'settings.unitsHint': 'Ein Wechsel der Einheit ändert deine Daten nicht: Nur die Anzeige wird umgerechnet. Excel-Exporte bleiben in km, Litern und L/100 km.',
  'settings.nav': 'Navigation und Eingabe', 'settings.startTab': 'Startbildschirm', 'settings.tabs': 'Angezeigte Tabs',
  'settings.tabsHint': 'Blende die Tabs aus, die du nicht nutzt. Bereits erfasste Kosten zählen weiter in der Statistik.',
  'settings.defaultFull': '„Vollgetankt“ standardmäßig an', 'settings.defaultFullHint': 'Ausschalten, wenn du meist nur teilweise tankst.',
  'settings.fuels': 'Kraftstoffe', 'settings.e85': 'Ethanolanteil von E85',
  'settings.e85Hint': 'Der tatsächliche Anteil schwankt je nach Jahreszeit und Tankstelle (65 bis 85 %). Er dient zur Berechnung des Ethanolanteils deiner Mischungen.',
  'settings.e85Toast': 'E85: {n} % Ethanol',
  'settings.decrease': 'Verringern', 'settings.increase': 'Erhöhen',

  'data.title': 'Daten', 'data.leadWeb': 'Alles wird nur in diesem Browser auf diesem Gerät gespeichert.',
  'data.leadApp': 'Alles wird nur in der App auf diesem Telefon gespeichert.',
  'data.androidTitle': 'Automatische Android-Sicherung',
  'data.androidText': 'Deine Fahrzeuge, Tankfüllungen, Kosten und Einstellungen sind in der <strong>Google-Sicherung deines Telefons</strong> enthalten (in deinem Google Drive). Sie kommen automatisch zurück, wenn du die App neu installierst oder mit demselben Google-Konto das Telefon wechselst.',
  'data.androidHint': 'Prüfe unter Android-Einstellungen › Google › Sicherung, dass die Sicherung aktiviert ist. Sie läuft etwa einmal am Tag, wenn das Telefon lädt und im WLAN ist.',
  'data.backupTitle': 'Vollständige Sicherung',
  'data.backupText': 'Eine Datei mit <strong>allen deinen Fahrzeugen, Tankfüllungen und Kosten</strong> (auch regelmäßigen). Bewahre sie sicher auf (Computer, Cloud, E-Mail…): Damit lässt sich alles wiederherstellen, auch auf einem anderen Telefon.',
  'data.download': 'Sicherung herunterladen', 'data.share': 'Sicherung speichern / senden',
  'data.restore': 'Aus Datei wiederherstellen', 'data.restoreHint': 'Die Wiederherstellung ersetzt die aktuellen Tankfüllungen und Kosten.',
  'data.excelTitle': 'Excel-Export',
  'data.excelText': 'Um deine Zahlen in einer Tabellenkalkulation anzusehen oder zu bearbeiten. Diese Dateien können nicht zur Wiederherstellung der App verwendet werden.',
  'data.csvFills': 'Tankfüllungen', 'data.csvFillsSub': 'Datum, Kilometerstand, Liter, Preis, Verbrauch… (.csv)',
  'data.csvExpenses': 'Kosten', 'data.csvExpensesSub': 'Eine Zeile pro Zahlung, regelmäßige inklusive (.csv)',
  'data.clearTitle': 'Alles löschen',
  'data.clearText': 'Löscht endgültig die Tankfüllungen und Kosten aller Fahrzeuge. Fahrzeuge und Einstellungen bleiben erhalten. Lade vorher eine Sicherung herunter.',
  'data.clearButton': 'Alle Tankfüllungen und Kosten löschen',

  'backup.none': 'Noch keine Sicherung heruntergeladen.', 'backup.today': 'heute', 'backup.yesterday': 'gestern',
  'backup.daysAgo': 'vor {n} Tagen', 'backup.last': 'Letzte Sicherung: {when} ({date}).',
  'backup.downloaded': 'Sicherung heruntergeladen',

  'restore.error': 'Wiederherstellung nicht möglich: {msg}',
  'restore.confirmFull': '{vehicles}, {fills} und {expenses} wiederherstellen?\n\nAlle aktuellen Fahrzeuge, Tankfüllungen und Kosten werden ersetzt.',
  'restore.confirmOld': 'Diese alte Sicherung enthält kein Fahrzeug.\n\n{fills} und {expenses} in „{name}“ wiederherstellen? Die aktuellen Tankfüllungen und Kosten dieses Fahrzeugs werden ersetzt.',
  'restore.done': 'Sicherung wiederhergestellt',

  'clear.confirm': 'Alle Tankfüllungen und Kosten aller Fahrzeuge endgültig löschen?\n\nFahrzeuge und Einstellungen bleiben erhalten.',
  'clear.done': 'Alle Tankfüllungen und Kosten wurden gelöscht',

  'export.dialog': 'Speichern oder senden', 'export.error': 'Export fehlgeschlagen: {msg}',

  'import.unreadable': 'unlesbare JSON-Datei.', 'import.notBackup': 'diese Datei ist keine CarConso-Sicherung.',
  'import.invalid': '{n} ungültige(s) Element(e) in der Datei.', 'import.noVehicle': 'kein Fahrzeug in der Datei.',
  'import.unknownVehicle': 'einige Tankfüllungen oder Kosten gehören zu einem unbekannten Fahrzeug.',

  'file.backup': 'carconso-sicherung', 'file.fills': 'carconso-tankfuellungen', 'file.expenses': 'carconso-kosten',

  'csv.fills': 'fahrzeug|datum|kilometerstand_km|strecke_km|vollgetankt|kraftstoffe|liter|gesamt|preis_pro_liter|ethanol_pct|verbrauch_l100',
  'csv.expenses': 'fahrzeug|datum|kategorie|betrag|wiederholung|notiz', 'csv.yes': 'ja', 'csv.no': 'nein',

  'about.title': 'Über', 'about.source': 'Quellcode auf GitHub',
  'about.sourceSub': 'Freie Software (GPL v3): Code ansehen, Problem melden…',
  'about.privacy': 'Datenschutz', 'about.privacySub': 'Keine Datenerfassung: Alles bleibt auf deinem Gerät.',
  'about.offline': 'funktioniert offline', 'about.credits': 'Entwickelt mit Hilfe von Claude (Anthropic)',
  'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
};
