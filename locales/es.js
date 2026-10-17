// Spanish texts. Every key must exist in all the locales/*.js files.

FUEL_NAMES.es = {
  E5: 'Gasolina 95 (E5)',
  E10: 'Gasolina 95 (E10)',
  SP95P: 'Gasolina 95 Premium',
  SP98: 'Gasolina 98',
  SP98P: 'Gasolina 98 Premium',
  REG: 'Regular',
  MID: 'Intermedia',
  PREM: 'Premium',
  E85: 'E85',
  B7: 'Diésel',
  B7P: 'Diésel Premium',
  E27: 'Gasolina E27',
  E100: 'Etanol E100',
};

MESSAGES.es = {
  'common.save': 'Guardar', 'common.update': 'Actualizar', 'common.cancel': 'Cancelar',
  'common.delete': 'Eliminar', 'common.add': 'Añadir', 'common.date': 'Fecha', 'common.optional': '(opcional)',
  'common.or': 'o', 'common.unknownError': 'error desconocido',

  'nav.add': 'Repostar', 'nav.history': 'Historial', 'nav.expenses': 'Gastos', 'nav.stats': 'Estadísticas',
  'nav.settings': 'Ajustes', 'topbar.vehicle': 'Vehículo',

  'fill.new': 'Nuevo repostaje', 'fill.edit': 'Editar repostaje', 'fill.odometer': 'Cuentakilómetros',
  'fill.distance': 'Distancia recorrida', 'fill.full': 'Depósito lleno',
  'fill.fullHint': 'Depósito lleno hasta arriba. Desactívalo para un repostaje parcial.',
  'fill.fuel': 'Combustible', 'fill.addFuel': 'Añadir un combustible (mezcla)', 'fill.fuelType': 'Tipo de combustible',
  'fill.volume.L': 'Litros', 'fill.volume.gal': 'Galones', 'fill.totalPrice': 'Precio total',
  'fill.removeFuel': 'Quitar este combustible', 'fill.confirmDelete': '¿Eliminar este repostaje?',

  'odo.previous': 'Cuentakilómetros en el repostaje anterior: {value}',
  'odo.unknown': 'Cuentakilómetros del repostaje anterior desconocido: indica también la distancia.',
  'odo.first': 'Primer repostaje: sirve de referencia, la distancia es opcional. Anota el cuentakilómetros para calcular los siguientes.',

  'preview.total': 'Total', 'preview.amount': 'Importe', 'preview.price': 'Precio {per}', 'preview.ethanol': 'Etanol',
  'preview.cost': 'Coste del trayecto {per100}', 'preview.mix': 'Mezcla',
  'preview.conso': 'Consumo del repostaje del {date}',

  'err.date': 'Indica la fecha del repostaje.', 'err.odoNumber': 'El cuentakilómetros debe ser un número de {unit}.',
  'err.odoPrevious': 'El cuentakilómetros debe superar el del repostaje anterior ({value}).',
  'err.distance': 'Indica el cuentakilómetros o la distancia desde el repostaje anterior.',
  'err.volume': 'Indica la cantidad de cada combustible.', 'err.total': 'Indica el precio total pagado por cada combustible.',
  'err.duplicateFuel': 'Cada combustible solo puede aparecer una vez.',
  'err.mixFamilies': 'No se pueden mezclar gasolina y diésel.',

  'toast.fillSaved': 'Repostaje guardado', 'toast.fillUpdated': 'Repostaje actualizado', 'toast.partialSaved': 'Repostaje parcial guardado',
  'toast.fillConso': '{title} — repostaje del {date}: {conso}',
  'toast.fillLater': '{title} — consumo calculado en el próximo depósito lleno',
  'toast.fillDeleted': 'Repostaje eliminado', 'toast.saveError': 'Error: no se pudieron guardar los datos',
  'toast.vehicle': 'Vehículo: {name}',

  'history.title': 'Historial', 'history.lead': 'Toca un repostaje para editarlo.',
  'history.empty': 'Ningún repostaje para este vehículo.', 'history.current': 'en curso', 'history.partial': 'Parcial',
  'history.odometer': 'Cuentakilómetros: {value}',

  'mix.share': '{pct} % {name}', 'mix.group': 'Mezcla {names}',

  'family.essence': 'Gasolina', 'family.diesel': 'Diésel',

  'category.entretien': 'Mantenimiento / cambio de aceite', 'category.pneus': 'Neumáticos', 'category.reparation': 'Reparación',
  'category.assurance': 'Seguro', 'category.controle': 'Inspección técnica (ITV)', 'category.peage': 'Peaje',
  'category.parking': 'Aparcamiento', 'category.lavage': 'Lavado', 'category.autre': 'Otro',

  'rec.monthly': 'Cada mes', 'rec.quarterly': 'Cada 3 meses', 'rec.semiannual': 'Cada 6 meses', 'rec.yearly': 'Cada año',
  'recShort.monthly': 'Mensual', 'recShort.quarterly': 'Trimestral', 'recShort.semiannual': 'Semestral', 'recShort.yearly': 'Anual',
  'recPer.monthly': '/mes', 'recPer.quarterly': '/trimestre', 'recPer.semiannual': '/semestre', 'recPer.yearly': '/año',

  'exp.new': 'Nuevo gasto', 'exp.edit': 'Editar gasto', 'exp.lead': 'Mantenimiento, seguro, peajes… puntuales o periódicos.',
  'exp.category': 'Categoría', 'exp.amount': 'Importe', 'exp.note': 'Nota', 'exp.notePlaceholder': 'Cambio de aceite + filtro',
  'exp.repeat': 'Repetición', 'exp.until': 'Hasta el', 'exp.none': 'Ninguna (gasto puntual)',
  'exp.recHint': '{rec} a partir del {date}. Los pagos pasados se cuentan automáticamente en las estadísticas.',
  'exp.since': 'Desde el {date}', 'exp.sinceUntil': 'Desde el {date} hasta el {end}',
  'exp.payments.one': '{n} pago: {amount}', 'exp.payments.other': '{n} pagos: {amount}',
  'exp.next': 'próximo el {date}', 'exp.ended': 'terminado', 'exp.empty': 'Ningún gasto para este vehículo.',
  'exp.recurring': 'Periódicos', 'exp.oneOff': 'Puntuales',
  'exp.errDate': 'Indica la fecha.', 'exp.errAmount': 'Indica el importe.',
  'exp.errEnd': 'La fecha de fin debe ser posterior a la de inicio.',
  'exp.updated': 'Gasto actualizado', 'exp.addedRec': 'Gasto periódico añadido: {amount} {per}', 'exp.added': 'Gasto añadido: {amount}',
  'exp.confirmDeleteRec': '¿Eliminar este gasto periódico y todos sus pagos? Para simplemente detenerlo, indica mejor una fecha de fin.',
  'exp.confirmDelete': '¿Eliminar este gasto?', 'exp.deleted': 'Gasto eliminado',

  'stats.title': 'Estadísticas', 'stats.empty': 'Aún no hay consumo en este periodo: se necesitan al menos dos depósitos llenos.',
  'stats.consoChart': 'Consumo por repostaje', 'stats.byFuel': 'Por combustible / mezcla', 'stats.priceChart': 'Precio {per}',
  'stats.monthly': 'Gastos por mes', 'stats.byCategory': 'Gastos por categoría', 'stats.forecast': 'Previsiones',
  'stats.avg': 'Consumo medio', 'stats.autonomy': 'Autonomía ≈ {dist} (depósito de {tank})',
  'stats.last': 'Último', 'stats.best': 'Mejor', 'stats.worst': 'Peor',
  'stats.noExpense': 'Ningún gasto en este periodo.',

  'period.label': 'Periodo', 'period.1': '1 mes', 'period.3': '3 meses', 'period.12': '1 año', 'period.all': 'Todo',

  'card.avgPrice': 'Precio medio', 'card.fuelPer': 'Combustible por {unit}', 'card.totalPer': 'Coste total por {unit}',
  'card.fuelAndExpenses': 'combustible + gastos', 'card.distance': 'Distancia', 'card.used': '{volume} comprados',
  'card.fuel': 'Combustible', 'card.expenses': 'Gastos', 'card.expensesSub': 'mantenimiento, seguro…',

  'th.fuel': 'Combustible', 'th.conso': 'Consumo', 'th.fills': 'Repost.', 'th.spent': 'Gastado', 'th.avgPrice': 'Precio medio',
  'th.category': 'Categoría', 'th.count': 'Número', 'th.total': 'Total', 'th.price': 'Precio',

  'chart.fuel': 'Combustible', 'chart.expenses': 'Gastos',

  'fc.fuel': 'Combustible / mes', 'fc.months.one': 'en {n} mes', 'fc.months.other': 'en {n} meses',
  'fc.expenses': 'Gastos / mes', 'fc.inclRecurring': 'periódicos incluidos', 'fc.km': 'Km al mes', 'fc.mi': 'Millas al mes',
  'fc.budget': 'Presupuesto anual', 'fc.empty': 'Las previsiones aparecerán tras un primer mes completo de datos.',

  'unit.km': 'km', 'unit.mile': 'milla', 'unit.perL': 'por litro', 'unit.perGal': 'por galón',

  'settings.title': 'Ajustes', 'settings.vehicles': 'Mis vehículos', 'settings.addVehicle': 'Añadir un vehículo',

  'vehicle.new': 'Nuevo vehículo', 'vehicle.edit': 'Editar «{name}»', 'vehicle.name': 'Nombre',
  'vehicle.namePlaceholder': 'Ibiza, el coche de Julia…', 'vehicle.engine': 'Motor',
  'vehicle.locked': 'Bloqueado: este vehículo ya tiene repostajes.', 'vehicle.tank': 'Capacidad del depósito',
  'vehicle.fuels': 'Combustibles disponibles',
  'vehicle.fuelsHint': 'Desmarca los que nunca uses: desaparecerán de las listas.',
  'vehicle.allFuels': 'Mostrar combustibles de otros países', 'vehicle.defaultFuel': 'Combustible por defecto',
  'vehicle.lastUsed': 'El último usado', 'vehicle.active': 'Activo', 'vehicle.tankBadge': 'Depósito {value}',
  'vehicle.errName': 'Ponle un nombre al vehículo.', 'vehicle.errDuplicate': 'Ya hay un vehículo con este nombre.',
  'vehicle.errTank': 'La capacidad del depósito debe ser un número de {unit}.',
  'vehicle.errFuels': 'Mantén al menos un combustible.',
  'vehicle.added': '«{name}» añadido y seleccionado', 'vehicle.updated': 'Vehículo actualizado',
  'vehicle.confirmDelete': '¿Eliminar «{name}» con sus {fills} y {expenses}?\n\nEsta acción no se puede deshacer.',
  'vehicle.deleted': '«{name}» eliminado', 'vehicle.defaultName': 'Mi coche',

  'count.fills.one': '{n} repostaje', 'count.fills.other': '{n} repostajes',
  'count.expenses.one': '{n} gasto', 'count.expenses.other': '{n} gastos',
  'count.vehicles.one': '{n} vehículo', 'count.vehicles.other': '{n} vehículos',

  'summary.vehicles.one': 'vehículo', 'summary.vehicles.other': 'vehículos',
  'summary.fills.one': 'repostaje', 'summary.fills.other': 'repostajes',
  'summary.expenses.one': 'gasto', 'summary.expenses.other': 'gastos',

  'settings.region': 'Idioma y país', 'settings.language': 'Idioma', 'settings.country': 'País',
  'settings.countryHint': 'El país determina el nombre y la lista de combustibles disponibles.',
  'settings.applyRegion': '¿Usar también la moneda y las unidades de este país?\n\n{details}',

  'country.FR': 'Francia', 'country.BE': 'Bélgica', 'country.LU': 'Luxemburgo', 'country.CH': 'Suiza',
  'country.CA': 'Canadá', 'country.GB': 'Reino Unido', 'country.IE': 'Irlanda', 'country.US': 'Estados Unidos',
  'country.DE': 'Alemania', 'country.AT': 'Austria', 'country.ES': 'España', 'country.IT': 'Italia',
  'country.PT': 'Portugal', 'country.NL': 'Países Bajos', 'country.MX': 'México', 'country.BR': 'Brasil',
  'country.OTHER': 'Otro país',

  'settings.appearance': 'Apariencia', 'settings.theme': 'Tema',
  'theme.auto': 'Automático', 'theme.light': 'Claro', 'theme.dark': 'Oscuro',
  'settings.themeHint': '«Automático» sigue el ajuste claro / oscuro de tu teléfono.',
  'settings.color': 'Color',
  'accent.teal': 'Turquesa', 'accent.blue': 'Azul', 'accent.violet': 'Violeta',
  'accent.rose': 'Rosa', 'accent.orange': 'Naranja', 'accent.green': 'Verde',
  'settings.textSize': 'Tamaño del texto', 'text.small': 'Pequeño', 'text.normal': 'Normal', 'text.large': 'Grande',
  'settings.density': 'Densidad de pantalla', 'density.normal': 'Normal', 'density.compact': 'Compacta',
  'settings.densityHint': '«Compacta» reduce los márgenes para ver más información en pantalla.',
  'settings.units': 'Unidades', 'settings.conso': 'Consumo', 'settings.distance': 'Distancia', 'settings.volume': 'Volumen',
  'settings.currency': 'Moneda', 'settings.priceDecimals': 'Decimales de los precios',

  'dist.km': 'km', 'dist.mi': 'Millas', 'vol.L': 'Litros', 'vol.gal': 'Galones (EE. UU.)',
  'dec.2': '2 decimales', 'dec.3': '3 decimales',

  'currency.EUR': 'Euro (€)', 'currency.CHF': 'Franco suizo (CHF)', 'currency.GBP': 'Libra esterlina (£)',
  'currency.USD': 'Dólar estadounidense ($)', 'currency.CAD': 'Dólar canadiense ($)',
  'currency.MXN': 'Peso mexicano ($)', 'currency.BRL': 'Real brasileño (R$)',

  'settings.unitsHint': 'Cambiar de unidad no modifica tus datos: solo se convierte la visualización. Las exportaciones a Excel siguen en km, litros y L/100 km.',
  'settings.nav': 'Navegación y entrada', 'settings.startTab': 'Pantalla de inicio', 'settings.tabs': 'Pestañas visibles',
  'settings.tabsHint': 'Oculta las pestañas que no uses. Los gastos ya introducidos siguen contando en las estadísticas.',
  'settings.defaultFull': '«Depósito lleno» marcado por defecto', 'settings.defaultFullHint': 'Desmárcalo si sueles hacer repostajes parciales.',
  'settings.fuels': 'Combustibles', 'settings.e85': 'Contenido de etanol del E85',
  'settings.e85Hint': 'El contenido real varía según la estación del año y la gasolinera (65 a 85 %). Sirve para calcular el etanol de tus mezclas.',
  'settings.e85Toast': 'E85: {n} % de etanol',
  'settings.decrease': 'Disminuir', 'settings.increase': 'Aumentar',

  'data.title': 'Datos', 'data.leadWeb': 'Todo se guarda solo en este navegador, en este dispositivo.',
  'data.leadApp': 'Todo se guarda solo en la aplicación, en este teléfono.',
  'data.androidTitle': 'Copia de seguridad automática de Android',
  'data.androidText': 'Tus vehículos, repostajes, gastos y ajustes se incluyen en la <strong>copia de seguridad de Google de tu teléfono</strong> (en tu Google Drive). Vuelven automáticamente si reinstalas la app o cambias de teléfono con la misma cuenta de Google.',
  'data.androidHint': 'Comprueba en Ajustes de Android › Google › Copia de seguridad que esté activada. Se hace aproximadamente una vez al día, con el teléfono cargando y en Wi-Fi.',
  'data.backupTitle': 'Copia de seguridad completa',
  'data.backupText': 'Un archivo con <strong>todos tus vehículos, repostajes y gastos</strong> (periódicos incluidos). Guárdalo en un lugar seguro (ordenador, nube, correo…): permite restaurarlo todo, incluso en otro teléfono.',
  'data.download': 'Descargar la copia', 'data.share': 'Guardar / enviar la copia',
  'data.restore': 'Restaurar desde un archivo', 'data.restoreHint': 'La restauración sustituye los repostajes y gastos actuales.',
  'data.excelTitle': 'Exportar a Excel',
  'data.excelText': 'Para consultar o trabajar tus cifras en una hoja de cálculo. Estos archivos no sirven para restaurar la aplicación.',
  'data.csvFills': 'Repostajes', 'data.csvFillsSub': 'Fecha, cuentakilómetros, litros, precio, consumo… (.csv)',
  'data.csvExpenses': 'Gastos', 'data.csvExpensesSub': 'Una fila por pago, periódicos incluidos (.csv)',
  'data.clearTitle': 'Borrarlo todo',
  'data.clearText': 'Elimina definitivamente los repostajes y gastos de todos los vehículos. Los vehículos y ajustes se conservan. Descarga antes una copia de seguridad.',
  'data.clearButton': 'Borrar todos los repostajes y gastos',

  'backup.none': 'Aún no has descargado ninguna copia.', 'backup.today': 'hoy', 'backup.yesterday': 'ayer',
  'backup.daysAgo': 'hace {n} días', 'backup.last': 'Última copia: {when} ({date}).',
  'backup.downloaded': 'Copia descargada',

  'restore.error': 'No se puede restaurar: {msg}',
  'restore.confirmFull': '¿Restaurar {vehicles}, {fills} y {expenses}?\n\nSe sustituirán todos los vehículos, repostajes y gastos actuales.',
  'restore.confirmOld': 'Esta copia antigua no contiene ningún vehículo.\n\n¿Restaurar {fills} y {expenses} en «{name}»? Se sustituirán los repostajes y gastos actuales de este vehículo.',
  'restore.done': 'Copia restaurada',

  'clear.confirm': '¿Borrar definitivamente todos los repostajes y gastos de todos los vehículos?\n\nLos vehículos y ajustes se conservan.',
  'clear.done': 'Se han borrado todos los repostajes y gastos',

  'export.dialog': 'Guardar o enviar', 'export.error': 'No se pudo exportar: {msg}',

  'import.unreadable': 'archivo JSON ilegible.', 'import.notBackup': 'este archivo no es una copia de CarConso.',
  'import.invalid': '{n} elemento(s) no válido(s) en el archivo.', 'import.noVehicle': 'ningún vehículo en el archivo.',
  'import.unknownVehicle': 'algunos repostajes o gastos pertenecen a un vehículo desconocido.',

  'file.backup': 'carconso-copia', 'file.fills': 'carconso-repostajes', 'file.expenses': 'carconso-gastos',

  'csv.fills': 'vehiculo|fecha|cuentakilometros_km|distancia_km|deposito_lleno|combustibles|litros|total|precio_litro|etanol_pct|consumo_l100',
  'csv.expenses': 'vehiculo|fecha|categoria|importe|repeticion|nota', 'csv.yes': 'sí', 'csv.no': 'no',

  'about.title': 'Acerca de', 'about.source': 'Código fuente en GitHub',
  'about.sourceSub': 'Software libre (GPL v3): consulta el código, informa de un problema…',
  'about.privacy': 'Privacidad', 'about.privacySub': 'Ningún dato recopilado: todo se queda en tu dispositivo.',
  'about.offline': 'funciona sin conexión', 'about.credits': 'Desarrollada con la ayuda de Claude (Anthropic)',
  'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
};
