// Italian texts. Every key must exist in all the locales/*.js files.

FUEL_NAMES.it = {
  E5: 'Benzina 95 (E5)',
  E10: 'Benzina 95 (E10)',
  SP95P: 'Benzina 95 Premium',
  SP98: 'Benzina 98',
  SP98P: 'Benzina 98 Premium',
  REG: 'Regular',
  MID: 'Midgrade',
  PREM: 'Premium',
  E85: 'E85',
  B7: 'Gasolio',
  B7P: 'Gasolio Premium',
  E27: 'Benzina E27',
  E100: 'Etanolo E100',
};

MESSAGES.it = {
  'common.save': 'Salva', 'common.update': 'Aggiorna', 'common.cancel': 'Annulla',
  'common.delete': 'Elimina', 'common.add': 'Aggiungi', 'common.date': 'Data', 'common.optional': '(facoltativo)',
  'common.or': 'o', 'common.unknownError': 'errore sconosciuto',

  'nav.add': 'Pieno', 'nav.history': 'Cronologia', 'nav.expenses': 'Spese', 'nav.stats': 'Statistiche',
  'nav.settings': 'Impostazioni', 'topbar.vehicle': 'Veicolo',

  'fill.new': 'Nuovo rifornimento', 'fill.edit': 'Modifica rifornimento', 'fill.odometer': 'Contachilometri',
  'fill.distance': 'Distanza percorsa', 'fill.full': 'Pieno completo',
  'fill.fullHint': 'Serbatoio riempito fino all\'orlo. Disattiva per un rifornimento parziale.',
  'fill.fuel': 'Carburante', 'fill.addFuel': 'Aggiungi un carburante (miscela)', 'fill.fuelType': 'Tipo di carburante',
  'fill.volume.L': 'Litri', 'fill.volume.gal': 'Galloni', 'fill.totalPrice': 'Prezzo totale',
  'fill.removeFuel': 'Rimuovi questo carburante', 'fill.confirmDelete': 'Eliminare questo rifornimento?',

  'odo.previous': 'Contachilometri al rifornimento precedente: {value}',
  'odo.unknown': 'Contachilometri del rifornimento precedente sconosciuto: indica anche la distanza.',
  'odo.first': 'Primo rifornimento: serve da riferimento, la distanza è facoltativa. Annota il contachilometri per calcolare i successivi.',

  'preview.total': 'Totale', 'preview.amount': 'Importo', 'preview.price': 'Prezzo {per}', 'preview.ethanol': 'Etanolo',
  'preview.cost': 'Costo del tragitto {per100}', 'preview.mix': 'Miscela',
  'preview.conso': 'Consumo del rifornimento del {date}',

  'err.date': 'Indica la data del rifornimento.', 'err.odoNumber': 'Il contachilometri deve essere un numero di {unit}.',
  'err.odoPrevious': 'Il contachilometri deve superare quello del rifornimento precedente ({value}).',
  'err.distance': 'Indica il contachilometri o la distanza dal rifornimento precedente.',
  'err.volume': 'Indica la quantità per ogni carburante.', 'err.total': 'Indica il prezzo totale pagato per ogni carburante.',
  'err.duplicateFuel': 'Ogni carburante può comparire una sola volta.',
  'err.mixFamilies': 'Non si possono mescolare benzina e gasolio.',

  'toast.fillSaved': 'Rifornimento salvato', 'toast.fillUpdated': 'Rifornimento aggiornato', 'toast.partialSaved': 'Rifornimento parziale salvato',
  'toast.fillConso': '{title} — rifornimento del {date}: {conso}',
  'toast.fillLater': '{title} — consumo calcolato al prossimo pieno completo',
  'toast.fillDeleted': 'Rifornimento eliminato', 'toast.saveError': 'Errore: impossibile salvare i dati',
  'toast.vehicle': 'Veicolo: {name}',

  'history.title': 'Cronologia', 'history.lead': 'Tocca un rifornimento per modificarlo.',
  'history.empty': 'Nessun rifornimento per questo veicolo.', 'history.current': 'in corso', 'history.partial': 'Parziale',
  'history.odometer': 'Contachilometri: {value}',

  'mix.share': '{pct}% {name}', 'mix.group': 'Miscela {names}',

  'family.essence': 'Benzina', 'family.diesel': 'Gasolio',

  'category.entretien': 'Manutenzione / tagliando', 'category.pneus': 'Pneumatici', 'category.reparation': 'Riparazione',
  'category.assurance': 'Assicurazione', 'category.controle': 'Revisione', 'category.peage': 'Pedaggio',
  'category.parking': 'Parcheggio', 'category.lavage': 'Autolavaggio', 'category.autre': 'Altro',

  'rec.monthly': 'Ogni mese', 'rec.quarterly': 'Ogni 3 mesi', 'rec.semiannual': 'Ogni 6 mesi', 'rec.yearly': 'Ogni anno',
  'recShort.monthly': 'Mensile', 'recShort.quarterly': 'Trimestrale', 'recShort.semiannual': 'Semestrale', 'recShort.yearly': 'Annuale',
  'recPer.monthly': '/mese', 'recPer.quarterly': '/trimestre', 'recPer.semiannual': '/semestre', 'recPer.yearly': '/anno',

  'exp.new': 'Nuova spesa', 'exp.edit': 'Modifica spesa', 'exp.lead': 'Manutenzione, assicurazione, pedaggi… una tantum o ricorrenti.',
  'exp.category': 'Categoria', 'exp.amount': 'Importo', 'exp.note': 'Nota', 'exp.notePlaceholder': 'Cambio olio + filtro',
  'exp.repeat': 'Ripetizione', 'exp.until': 'Fino al', 'exp.none': 'Nessuna (spesa una tantum)',
  'exp.recHint': '{rec} a partire dal {date}. Le scadenze passate sono contate automaticamente nelle statistiche.',
  'exp.since': 'Dal {date}', 'exp.sinceUntil': 'Dal {date} al {end}',
  'exp.payments.one': '{n} scadenza: {amount}', 'exp.payments.other': '{n} scadenze: {amount}',
  'exp.next': 'prossima il {date}', 'exp.ended': 'terminata', 'exp.empty': 'Nessuna spesa per questo veicolo.',
  'exp.recurring': 'Ricorrenti', 'exp.oneOff': 'Una tantum',
  'exp.errDate': 'Indica la data.', 'exp.errAmount': 'Indica l\'importo.',
  'exp.errEnd': 'La data di fine deve essere successiva a quella di inizio.',
  'exp.updated': 'Spesa aggiornata', 'exp.addedRec': 'Spesa ricorrente aggiunta: {amount} {per}', 'exp.added': 'Spesa aggiunta: {amount}',
  'exp.confirmDeleteRec': 'Eliminare questa spesa ricorrente e tutte le sue scadenze? Per interromperla soltanto, indica piuttosto una data di fine.',
  'exp.confirmDelete': 'Eliminare questa spesa?', 'exp.deleted': 'Spesa eliminata',

  'stats.title': 'Statistiche', 'stats.empty': 'Ancora nessun consumo in questo periodo: servono almeno due pieni completi.',
  'stats.consoChart': 'Consumo per rifornimento', 'stats.byFuel': 'Per carburante / miscela', 'stats.priceChart': 'Prezzo {per}',
  'stats.monthly': 'Spese mensili', 'stats.byCategory': 'Spese per categoria', 'stats.forecast': 'Previsioni',
  'stats.avg': 'Consumo medio', 'stats.autonomy': 'Autonomia ≈ {dist} (serbatoio da {tank})',
  'stats.last': 'Ultimo', 'stats.best': 'Migliore', 'stats.worst': 'Peggiore',
  'stats.noExpense': 'Nessuna spesa in questo periodo.',

  'period.label': 'Periodo', 'period.1': '1 mese', 'period.3': '3 mesi', 'period.12': '1 anno', 'period.all': 'Tutto',

  'card.avgPrice': 'Prezzo medio', 'card.fuelPer': 'Carburante al {unit}', 'card.totalPer': 'Costo totale al {unit}',
  'card.fuelAndExpenses': 'carburante + spese', 'card.distance': 'Distanza', 'card.used': '{volume} acquistati',
  'card.fuel': 'Carburante', 'card.expenses': 'Spese', 'card.expensesSub': 'manutenzione, assicurazione…',

  'th.fuel': 'Carburante', 'th.conso': 'Consumo', 'th.fills': 'Rifornim.', 'th.spent': 'Speso', 'th.avgPrice': 'Prezzo medio',
  'th.category': 'Categoria', 'th.count': 'Numero', 'th.total': 'Totale', 'th.price': 'Prezzo',

  'chart.fuel': 'Carburante', 'chart.expenses': 'Spese',

  'fc.fuel': 'Carburante / mese', 'fc.months.one': 'su {n} mese', 'fc.months.other': 'su {n} mesi',
  'fc.expenses': 'Spese / mese', 'fc.inclRecurring': 'ricorrenti incluse', 'fc.km': 'Km al mese', 'fc.mi': 'Miglia al mese',
  'fc.budget': 'Budget annuale', 'fc.empty': 'Le previsioni compariranno dopo un primo mese completo di dati.',

  'unit.km': 'km', 'unit.mile': 'miglio', 'unit.perL': 'al litro', 'unit.perGal': 'al gallone',

  'settings.title': 'Impostazioni', 'settings.vehicles': 'I miei veicoli', 'settings.addVehicle': 'Aggiungi un veicolo',

  'vehicle.new': 'Nuovo veicolo', 'vehicle.edit': 'Modifica «{name}»', 'vehicle.name': 'Nome',
  'vehicle.namePlaceholder': 'Panda, l\'auto di Giulia…', 'vehicle.engine': 'Motorizzazione',
  'vehicle.locked': 'Bloccata: questo veicolo ha già dei rifornimenti.', 'vehicle.tank': 'Capacità del serbatoio',
  'vehicle.fuels': 'Carburanti proposti',
  'vehicle.fuelsHint': 'Deseleziona quelli che non usi mai: spariscono dagli elenchi.',
  'vehicle.allFuels': 'Mostra i carburanti di altri paesi', 'vehicle.defaultFuel': 'Carburante predefinito',
  'vehicle.lastUsed': 'L\'ultimo usato', 'vehicle.active': 'Attivo', 'vehicle.tankBadge': 'Serbatoio {value}',
  'vehicle.errName': 'Dai un nome al veicolo.', 'vehicle.errDuplicate': 'Esiste già un veicolo con questo nome.',
  'vehicle.errTank': 'La capacità del serbatoio deve essere un numero di {unit}.',
  'vehicle.errFuels': 'Mantieni almeno un carburante.',
  'vehicle.added': '«{name}» aggiunto e selezionato', 'vehicle.updated': 'Veicolo aggiornato',
  'vehicle.confirmDelete': 'Eliminare «{name}» con i suoi {fills} e {expenses}?\n\nL\'operazione è definitiva.',
  'vehicle.deleted': '«{name}» eliminato', 'vehicle.defaultName': 'La mia auto',

  'count.fills.one': '{n} rifornimento', 'count.fills.other': '{n} rifornimenti',
  'count.expenses.one': '{n} spesa', 'count.expenses.other': '{n} spese',
  'count.vehicles.one': '{n} veicolo', 'count.vehicles.other': '{n} veicoli',

  'summary.vehicles.one': 'veicolo', 'summary.vehicles.other': 'veicoli',
  'summary.fills.one': 'rifornimento', 'summary.fills.other': 'rifornimenti',
  'summary.expenses.one': 'spesa', 'summary.expenses.other': 'spese',

  'settings.region': 'Lingua e paese', 'settings.language': 'Lingua', 'settings.country': 'Paese',
  'settings.countryHint': 'Il paese determina il nome e l\'elenco dei carburanti proposti.',
  'settings.applyRegion': 'Usare anche la valuta e le unità di questo paese?\n\n{details}',

  'country.FR': 'Francia', 'country.BE': 'Belgio', 'country.LU': 'Lussemburgo', 'country.CH': 'Svizzera',
  'country.CA': 'Canada', 'country.GB': 'Regno Unito', 'country.IE': 'Irlanda', 'country.US': 'Stati Uniti',
  'country.DE': 'Germania', 'country.AT': 'Austria', 'country.ES': 'Spagna', 'country.IT': 'Italia',
  'country.PT': 'Portogallo', 'country.NL': 'Paesi Bassi', 'country.MX': 'Messico', 'country.BR': 'Brasile',
  'country.OTHER': 'Altro paese',

  'settings.appearance': 'Aspetto', 'settings.theme': 'Tema',
  'theme.auto': 'Automatico', 'theme.light': 'Chiaro', 'theme.dark': 'Scuro',
  'settings.themeHint': '«Automatico» segue l\'impostazione chiaro / scuro del telefono.',
  'settings.color': 'Colore',
  'accent.teal': 'Turchese', 'accent.blue': 'Blu', 'accent.violet': 'Viola',
  'accent.rose': 'Rosa', 'accent.orange': 'Arancione', 'accent.green': 'Verde',
  'settings.textSize': 'Dimensione del testo', 'text.small': 'Piccola', 'text.normal': 'Normale', 'text.large': 'Grande',
  'settings.density': 'Densità di visualizzazione', 'density.normal': 'Normale', 'density.compact': 'Compatta',
  'settings.densityHint': '«Compatta» riduce i margini per vedere più informazioni sullo schermo.',
  'settings.units': 'Unità', 'settings.conso': 'Consumo', 'settings.distance': 'Distanza', 'settings.volume': 'Volume',
  'settings.currency': 'Valuta', 'settings.priceDecimals': 'Decimali dei prezzi',

  'dist.km': 'km', 'dist.mi': 'Miglia', 'vol.L': 'Litri', 'vol.gal': 'Galloni (USA)',
  'dec.2': '2 decimali', 'dec.3': '3 decimali',

  'currency.EUR': 'Euro (€)', 'currency.CHF': 'Franco svizzero (CHF)', 'currency.GBP': 'Sterlina britannica (£)',
  'currency.USD': 'Dollaro statunitense ($)', 'currency.CAD': 'Dollaro canadese ($)',
  'currency.MXN': 'Peso messicano ($)', 'currency.BRL': 'Real brasiliano (R$)',

  'settings.unitsHint': 'Cambiare unità non modifica i tuoi dati: viene convertita solo la visualizzazione. Le esportazioni Excel restano in km, litri e L/100 km.',
  'settings.nav': 'Navigazione e inserimento', 'settings.startTab': 'Schermata iniziale', 'settings.tabs': 'Schede visibili',
  'settings.tabsHint': 'Nascondi le schede che non usi. Le spese già inserite restano conteggiate nelle statistiche.',
  'settings.defaultFull': '«Pieno completo» selezionato per impostazione predefinita', 'settings.defaultFullHint': 'Deseleziona se fai soprattutto rifornimenti parziali.',
  'settings.fuels': 'Carburanti', 'settings.e85': 'Percentuale di etanolo dell\'E85',
  'settings.e85Hint': 'La percentuale reale varia secondo la stagione e il distributore (dal 65 all\'85%). Serve a calcolare l\'etanolo delle tue miscele.',
  'settings.e85Toast': 'E85: {n}% di etanolo',
  'settings.decrease': 'Diminuisci', 'settings.increase': 'Aumenta',

  'data.title': 'Dati', 'data.leadWeb': 'Tutto è salvato solo in questo browser, su questo dispositivo.',
  'data.leadApp': 'Tutto è salvato solo nell\'app, su questo telefono.',
  'data.androidTitle': 'Backup automatico di Android',
  'data.androidText': 'I tuoi veicoli, rifornimenti, spese e impostazioni sono inclusi nel <strong>backup Google del telefono</strong> (sul tuo Google Drive). Tornano automaticamente se reinstalli l\'app o cambi telefono con lo stesso account Google.',
  'data.androidHint': 'Verifica in Impostazioni Android › Google › Backup che il backup sia attivo. Avviene circa una volta al giorno, con il telefono in carica e in Wi-Fi.',
  'data.backupTitle': 'Backup completo',
  'data.backupText': 'Un file con <strong>tutti i tuoi veicoli, rifornimenti e spese</strong> (ricorrenti incluse). Conservalo in un posto sicuro (computer, cloud, e-mail…): permette di ripristinare tutto, anche su un altro telefono.',
  'data.download': 'Scarica il backup', 'data.share': 'Salva / invia il backup',
  'data.restore': 'Ripristina da un file', 'data.restoreHint': 'Il ripristino sostituisce i rifornimenti e le spese attuali.',
  'data.excelTitle': 'Esportazione Excel',
  'data.excelText': 'Per consultare o rielaborare i tuoi dati in un foglio di calcolo. Questi file non servono a ripristinare l\'app.',
  'data.csvFills': 'Rifornimenti', 'data.csvFillsSub': 'Data, contachilometri, litri, prezzo, consumo… (.csv)',
  'data.csvExpenses': 'Spese', 'data.csvExpensesSub': 'Una riga per scadenza, ricorrenti incluse (.csv)',
  'data.clearTitle': 'Cancella tutto',
  'data.clearText': 'Elimina definitivamente i rifornimenti e le spese di tutti i veicoli. Veicoli e impostazioni vengono conservati. Scarica prima un backup.',
  'data.clearButton': 'Cancella tutti i rifornimenti e le spese',

  'backup.none': 'Nessun backup scaricato finora.', 'backup.today': 'oggi', 'backup.yesterday': 'ieri',
  'backup.daysAgo': '{n} giorni fa', 'backup.last': 'Ultimo backup: {when} ({date}).',
  'backup.downloaded': 'Backup scaricato',

  'restore.error': 'Ripristino impossibile: {msg}',
  'restore.confirmFull': 'Ripristinare {vehicles}, {fills} e {expenses}?\n\nTutti i veicoli, rifornimenti e spese attuali saranno sostituiti.',
  'restore.confirmOld': 'Questo vecchio backup non contiene veicoli.\n\nRipristinare {fills} e {expenses} in «{name}»? I rifornimenti e le spese attuali di questo veicolo saranno sostituiti.',
  'restore.done': 'Backup ripristinato',

  'clear.confirm': 'Cancellare definitivamente tutti i rifornimenti e le spese di tutti i veicoli?\n\nVeicoli e impostazioni vengono conservati.',
  'clear.done': 'Tutti i rifornimenti e le spese sono stati cancellati',

  'export.dialog': 'Salva o invia', 'export.error': 'Esportazione non riuscita: {msg}',

  'import.unreadable': 'file JSON illeggibile.', 'import.notBackup': 'questo file non è un backup di CarConso.',
  'import.invalid': '{n} elemento/i non valido/i nel file.', 'import.noVehicle': 'nessun veicolo nel file.',
  'import.unknownVehicle': 'alcuni rifornimenti o spese appartengono a un veicolo sconosciuto.',

  'file.backup': 'carconso-backup', 'file.fills': 'carconso-rifornimenti', 'file.expenses': 'carconso-spese',

  'csv.fills': 'veicolo|data|contachilometri_km|distanza_km|pieno_completo|carburanti|litri|totale|prezzo_litro|etanolo_pct|consumo_l100',
  'csv.expenses': 'veicolo|data|categoria|importo|ripetizione|nota', 'csv.yes': 'sì', 'csv.no': 'no',

  'about.title': 'Informazioni', 'about.source': 'Codice sorgente su GitHub',
  'about.sourceSub': 'Software libero (GPL v3): consulta il codice, segnala un problema…',
  'about.privacy': 'Privacy', 'about.privacySub': 'Nessun dato raccolto: tutto resta sul tuo dispositivo.',
  'about.offline': 'funziona offline', 'about.credits': 'Sviluppata con l\'aiuto di Claude (Anthropic)',
  'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
};
