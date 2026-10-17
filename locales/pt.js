// Portuguese texts. Every key must exist in all the locales/*.js files.

FUEL_NAMES.pt = {
  E5: 'Gasolina 95 (E5)',
  E10: 'Gasolina 95 (E10)',
  SP95P: 'Gasolina 95 Premium',
  SP98: 'Gasolina 98',
  SP98P: 'Gasolina 98 Premium',
  REG: 'Regular',
  MID: 'Intermediária',
  PREM: 'Premium',
  E85: 'E85',
  B7: 'Diesel',
  B7P: 'Diesel Premium',
  E27: 'Gasolina E27',
  E100: 'Etanol E100',
};

MESSAGES.pt = {
  'common.save': 'Salvar', 'common.update': 'Atualizar', 'common.cancel': 'Cancelar',
  'common.delete': 'Excluir', 'common.add': 'Adicionar', 'common.date': 'Data', 'common.optional': '(opcional)',
  'common.or': 'ou', 'common.unknownError': 'erro desconhecido',

  'nav.add': 'Abastecer', 'nav.history': 'Histórico', 'nav.expenses': 'Despesas', 'nav.stats': 'Estatísticas',
  'nav.settings': 'Definições', 'topbar.vehicle': 'Veículo',

  'fill.new': 'Novo abastecimento', 'fill.edit': 'Editar abastecimento', 'fill.odometer': 'Quilometragem',
  'fill.distance': 'Distância percorrida', 'fill.full': 'Tanque cheio',
  'fill.fullHint': 'Tanque cheio até o limite. Desative para um abastecimento parcial.',
  'fill.fuel': 'Combustível', 'fill.addFuel': 'Adicionar um combustível (mistura)', 'fill.fuelType': 'Tipo de combustível',
  'fill.volume.L': 'Litros', 'fill.volume.gal': 'Galões', 'fill.totalPrice': 'Preço total',
  'fill.removeFuel': 'Remover este combustível', 'fill.confirmDelete': 'Excluir este abastecimento?',

  'odo.previous': 'Quilometragem no abastecimento anterior: {value}',
  'odo.unknown': 'Quilometragem do abastecimento anterior desconhecida: indique também a distância.',
  'odo.first': 'Primeiro abastecimento: serve de referência, a distância é opcional. Anote a quilometragem para calcular os seguintes.',

  'preview.total': 'Total', 'preview.amount': 'Valor', 'preview.price': 'Preço {per}', 'preview.ethanol': 'Etanol',
  'preview.cost': 'Custo do trajeto {per100}', 'preview.mix': 'Mistura',
  'preview.conso': 'Consumo do abastecimento de {date}',

  'err.date': 'Indique a data do abastecimento.', 'err.odoNumber': 'A quilometragem deve ser um número de {unit}.',
  'err.odoPrevious': 'A quilometragem deve ser maior que a do abastecimento anterior ({value}).',
  'err.distance': 'Indique a quilometragem ou a distância desde o abastecimento anterior.',
  'err.volume': 'Indique a quantidade de cada combustível.', 'err.total': 'Indique o preço total pago por cada combustível.',
  'err.duplicateFuel': 'Cada combustível só pode aparecer uma vez.',
  'err.mixFamilies': 'Não é possível misturar gasolina e diesel.',

  'toast.fillSaved': 'Abastecimento salvo', 'toast.fillUpdated': 'Abastecimento atualizado', 'toast.partialSaved': 'Abastecimento parcial salvo',
  'toast.fillConso': '{title} — abastecimento de {date}: {conso}',
  'toast.fillLater': '{title} — consumo calculado no próximo tanque cheio',
  'toast.fillDeleted': 'Abastecimento excluído', 'toast.saveError': 'Erro: não foi possível salvar os dados',
  'toast.vehicle': 'Veículo: {name}',

  'history.title': 'Histórico', 'history.lead': 'Toque num abastecimento para editá-lo.',
  'history.empty': 'Nenhum abastecimento para este veículo.', 'history.current': 'em curso', 'history.partial': 'Parcial',
  'history.odometer': 'Quilometragem: {value}',

  'mix.share': '{pct}% {name}', 'mix.group': 'Mistura {names}',

  'family.essence': 'Gasolina', 'family.diesel': 'Diesel',

  'category.entretien': 'Manutenção / troca de óleo', 'category.pneus': 'Pneus', 'category.reparation': 'Reparação',
  'category.assurance': 'Seguro', 'category.controle': 'Inspeção', 'category.peage': 'Pedágio / portagem',
  'category.parking': 'Estacionamento', 'category.lavage': 'Lavagem', 'category.autre': 'Outro',

  'rec.monthly': 'Todo mês', 'rec.quarterly': 'A cada 3 meses', 'rec.semiannual': 'A cada 6 meses', 'rec.yearly': 'Todo ano',
  'recShort.monthly': 'Mensal', 'recShort.quarterly': 'Trimestral', 'recShort.semiannual': 'Semestral', 'recShort.yearly': 'Anual',
  'recPer.monthly': '/mês', 'recPer.quarterly': '/trimestre', 'recPer.semiannual': '/semestre', 'recPer.yearly': '/ano',

  'exp.new': 'Nova despesa', 'exp.edit': 'Editar despesa', 'exp.lead': 'Manutenção, seguro, pedágios… pontuais ou recorrentes.',
  'exp.category': 'Categoria', 'exp.amount': 'Valor', 'exp.note': 'Nota', 'exp.notePlaceholder': 'Troca de óleo + filtro',
  'exp.repeat': 'Repetição', 'exp.until': 'Até', 'exp.none': 'Nenhuma (despesa pontual)',
  'exp.recHint': '{rec} a partir de {date}. Os pagamentos passados são contados automaticamente nas estatísticas.',
  'exp.since': 'Desde {date}', 'exp.sinceUntil': 'De {date} até {end}',
  'exp.payments.one': '{n} pagamento: {amount}', 'exp.payments.other': '{n} pagamentos: {amount}',
  'exp.next': 'próximo em {date}', 'exp.ended': 'encerrada', 'exp.empty': 'Nenhuma despesa para este veículo.',
  'exp.recurring': 'Recorrentes', 'exp.oneOff': 'Pontuais',
  'exp.errDate': 'Indique a data.', 'exp.errAmount': 'Indique o valor.',
  'exp.errEnd': 'A data de fim deve ser posterior à data de início.',
  'exp.updated': 'Despesa atualizada', 'exp.addedRec': 'Despesa recorrente adicionada: {amount} {per}', 'exp.added': 'Despesa adicionada: {amount}',
  'exp.confirmDeleteRec': 'Excluir esta despesa recorrente e todos os seus pagamentos? Para apenas interrompê-la, indique uma data de fim.',
  'exp.confirmDelete': 'Excluir esta despesa?', 'exp.deleted': 'Despesa excluída',

  'stats.title': 'Estatísticas', 'stats.empty': 'Ainda não há consumo neste período: são necessários pelo menos dois abastecimentos de tanque cheio.',
  'stats.consoChart': 'Consumo por abastecimento', 'stats.byFuel': 'Por combustível / mistura', 'stats.priceChart': 'Preço {per}',
  'stats.monthly': 'Gastos por mês', 'stats.byCategory': 'Despesas por categoria', 'stats.forecast': 'Previsões',
  'stats.avg': 'Consumo médio', 'stats.autonomy': 'Autonomia ≈ {dist} (tanque de {tank})',
  'stats.last': 'Último', 'stats.best': 'Melhor', 'stats.worst': 'Pior',
  'stats.noExpense': 'Nenhuma despesa neste período.',

  'period.label': 'Período', 'period.1': '1 mês', 'period.3': '3 meses', 'period.12': '1 ano', 'period.all': 'Tudo',

  'card.avgPrice': 'Preço médio', 'card.fuelPer': 'Combustível por {unit}', 'card.totalPer': 'Custo total por {unit}',
  'card.fuelAndExpenses': 'combustível + despesas', 'card.distance': 'Distância', 'card.used': '{volume} comprados',
  'card.fuel': 'Combustível', 'card.expenses': 'Despesas', 'card.expensesSub': 'manutenção, seguro…',

  'th.fuel': 'Combustível', 'th.conso': 'Consumo', 'th.fills': 'Abast.', 'th.spent': 'Gasto', 'th.avgPrice': 'Preço médio',
  'th.category': 'Categoria', 'th.count': 'Número', 'th.total': 'Total', 'th.price': 'Preço',

  'chart.fuel': 'Combustível', 'chart.expenses': 'Despesas',

  'fc.fuel': 'Combustível / mês', 'fc.months.one': 'em {n} mês', 'fc.months.other': 'em {n} meses',
  'fc.expenses': 'Despesas / mês', 'fc.inclRecurring': 'recorrentes incluídas', 'fc.km': 'Km por mês', 'fc.mi': 'Milhas por mês',
  'fc.budget': 'Orçamento anual', 'fc.empty': 'As previsões aparecerão após um primeiro mês completo de dados.',

  'unit.km': 'km', 'unit.mile': 'milha', 'unit.perL': 'por litro', 'unit.perGal': 'por galão',

  'settings.title': 'Definições', 'settings.vehicles': 'Meus veículos', 'settings.addVehicle': 'Adicionar um veículo',

  'vehicle.new': 'Novo veículo', 'vehicle.edit': 'Editar “{name}”', 'vehicle.name': 'Nome',
  'vehicle.namePlaceholder': 'Gol, o carro da Júlia…', 'vehicle.engine': 'Motorização',
  'vehicle.locked': 'Bloqueada: este veículo já tem abastecimentos.', 'vehicle.tank': 'Capacidade do tanque',
  'vehicle.fuels': 'Combustíveis disponíveis',
  'vehicle.fuelsHint': 'Desmarque os que nunca usa: eles desaparecem das listas.',
  'vehicle.allFuels': 'Mostrar combustíveis de outros países', 'vehicle.defaultFuel': 'Combustível padrão',
  'vehicle.lastUsed': 'O último usado', 'vehicle.active': 'Ativo', 'vehicle.tankBadge': 'Tanque {value}',
  'vehicle.errName': 'Dê um nome ao veículo.', 'vehicle.errDuplicate': 'Já existe um veículo com este nome.',
  'vehicle.errTank': 'A capacidade do tanque deve ser um número de {unit}.',
  'vehicle.errFuels': 'Mantenha pelo menos um combustível.',
  'vehicle.added': '“{name}” adicionado e selecionado', 'vehicle.updated': 'Veículo atualizado',
  'vehicle.confirmDelete': 'Excluir “{name}” com os seus {fills} e {expenses}?\n\nEsta ação é definitiva.',
  'vehicle.deleted': '“{name}” excluído', 'vehicle.defaultName': 'Meu carro',

  'count.fills.one': '{n} abastecimento', 'count.fills.other': '{n} abastecimentos',
  'count.expenses.one': '{n} despesa', 'count.expenses.other': '{n} despesas',
  'count.vehicles.one': '{n} veículo', 'count.vehicles.other': '{n} veículos',

  'summary.vehicles.one': 'veículo', 'summary.vehicles.other': 'veículos',
  'summary.fills.one': 'abastecimento', 'summary.fills.other': 'abastecimentos',
  'summary.expenses.one': 'despesa', 'summary.expenses.other': 'despesas',

  'settings.region': 'Idioma e país', 'settings.language': 'Idioma', 'settings.country': 'País',
  'settings.countryHint': 'O país determina o nome e a lista de combustíveis disponíveis.',
  'settings.applyRegion': 'Usar também a moeda e as unidades deste país?\n\n{details}',

  'country.FR': 'França', 'country.BE': 'Bélgica', 'country.LU': 'Luxemburgo', 'country.CH': 'Suíça',
  'country.CA': 'Canadá', 'country.GB': 'Reino Unido', 'country.IE': 'Irlanda', 'country.US': 'Estados Unidos',
  'country.DE': 'Alemanha', 'country.AT': 'Áustria', 'country.ES': 'Espanha', 'country.IT': 'Itália',
  'country.PT': 'Portugal', 'country.NL': 'Países Baixos', 'country.MX': 'México', 'country.BR': 'Brasil',
  'country.OTHER': 'Outro país',

  'settings.appearance': 'Aparência', 'settings.theme': 'Tema',
  'theme.auto': 'Automático', 'theme.light': 'Claro', 'theme.dark': 'Escuro',
  'settings.themeHint': '“Automático” segue a configuração claro / escuro do telefone.',
  'settings.color': 'Cor',
  'accent.teal': 'Turquesa', 'accent.blue': 'Azul', 'accent.violet': 'Violeta',
  'accent.rose': 'Rosa', 'accent.orange': 'Laranja', 'accent.green': 'Verde',
  'settings.textSize': 'Tamanho do texto', 'text.small': 'Pequeno', 'text.normal': 'Normal', 'text.large': 'Grande',
  'settings.density': 'Densidade da tela', 'density.normal': 'Normal', 'density.compact': 'Compacta',
  'settings.densityHint': '“Compacta” reduz as margens para mostrar mais informações na tela.',
  'settings.units': 'Unidades', 'settings.conso': 'Consumo', 'settings.distance': 'Distância', 'settings.volume': 'Volume',
  'settings.currency': 'Moeda', 'settings.priceDecimals': 'Casas decimais dos preços',

  'dist.km': 'km', 'dist.mi': 'Milhas', 'vol.L': 'Litros', 'vol.gal': 'Galões (EUA)',
  'dec.2': '2 casas decimais', 'dec.3': '3 casas decimais',

  'currency.EUR': 'Euro (€)', 'currency.CHF': 'Franco suíço (CHF)', 'currency.GBP': 'Libra esterlina (£)',
  'currency.USD': 'Dólar americano ($)', 'currency.CAD': 'Dólar canadense ($)',
  'currency.MXN': 'Peso mexicano ($)', 'currency.BRL': 'Real brasileiro (R$)',

  'settings.unitsHint': 'Mudar de unidade não altera os seus dados: apenas a exibição é convertida. As exportações para Excel continuam em km, litros e L/100 km.',
  'settings.nav': 'Navegação e entrada', 'settings.startTab': 'Tela inicial', 'settings.tabs': 'Abas visíveis',
  'settings.tabsHint': 'Oculte as abas que não usa. As despesas já registradas continuam contando nas estatísticas.',
  'settings.defaultFull': '“Tanque cheio” marcado por padrão', 'settings.defaultFullHint': 'Desmarque se costuma fazer abastecimentos parciais.',
  'settings.fuels': 'Combustíveis', 'settings.e85': 'Teor de etanol do E85',
  'settings.e85Hint': 'O teor real varia conforme a estação e o posto (65 a 85%). Serve para calcular o etanol das suas misturas.',
  'settings.e85Toast': 'E85: {n}% de etanol',
  'settings.decrease': 'Diminuir', 'settings.increase': 'Aumentar',

  'data.title': 'Dados', 'data.leadWeb': 'Tudo fica salvo apenas neste navegador, neste dispositivo.',
  'data.leadApp': 'Tudo fica salvo apenas no aplicativo, neste telefone.',
  'data.androidTitle': 'Backup automático do Android',
  'data.androidText': 'Os seus veículos, abastecimentos, despesas e definições estão incluídos no <strong>backup do Google do seu telefone</strong> (no seu Google Drive). Eles voltam automaticamente se você reinstalar o app ou trocar de telefone com a mesma conta Google.',
  'data.androidHint': 'Verifique em Configurações do Android › Google › Backup que o backup está ativado. Ele é feito cerca de uma vez por dia, com o telefone carregando e no Wi-Fi.',
  'data.backupTitle': 'Backup completo',
  'data.backupText': 'Um arquivo com <strong>todos os seus veículos, abastecimentos e despesas</strong> (recorrentes incluídas). Guarde-o em lugar seguro (computador, nuvem, e-mail…): ele permite restaurar tudo, mesmo noutro telefone.',
  'data.download': 'Baixar o backup', 'data.share': 'Salvar / enviar o backup',
  'data.restore': 'Restaurar de um arquivo', 'data.restoreHint': 'A restauração substitui os abastecimentos e despesas atuais.',
  'data.excelTitle': 'Exportar para Excel',
  'data.excelText': 'Para consultar ou trabalhar os seus números numa planilha. Estes arquivos não servem para restaurar o aplicativo.',
  'data.csvFills': 'Abastecimentos', 'data.csvFillsSub': 'Data, quilometragem, litros, preço, consumo… (.csv)',
  'data.csvExpenses': 'Despesas', 'data.csvExpensesSub': 'Uma linha por pagamento, recorrentes incluídas (.csv)',
  'data.clearTitle': 'Apagar tudo',
  'data.clearText': 'Exclui definitivamente os abastecimentos e despesas de todos os veículos. Os veículos e definições são mantidos. Baixe um backup antes.',
  'data.clearButton': 'Apagar todos os abastecimentos e despesas',

  'backup.none': 'Nenhum backup baixado até agora.', 'backup.today': 'hoje', 'backup.yesterday': 'ontem',
  'backup.daysAgo': 'há {n} dias', 'backup.last': 'Último backup: {when} ({date}).',
  'backup.downloaded': 'Backup baixado',

  'restore.error': 'Não foi possível restaurar: {msg}',
  'restore.confirmFull': 'Restaurar {vehicles}, {fills} e {expenses}?\n\nTodos os veículos, abastecimentos e despesas atuais serão substituídos.',
  'restore.confirmOld': 'Este backup antigo não contém veículos.\n\nRestaurar {fills} e {expenses} em “{name}”? Os abastecimentos e despesas atuais deste veículo serão substituídos.',
  'restore.done': 'Backup restaurado',

  'clear.confirm': 'Apagar definitivamente todos os abastecimentos e despesas de todos os veículos?\n\nOs veículos e definições são mantidos.',
  'clear.done': 'Todos os abastecimentos e despesas foram apagados',

  'export.dialog': 'Salvar ou enviar', 'export.error': 'Não foi possível exportar: {msg}',

  'import.unreadable': 'arquivo JSON ilegível.', 'import.notBackup': 'este arquivo não é um backup do CarConso.',
  'import.invalid': '{n} item(ns) inválido(s) no arquivo.', 'import.noVehicle': 'nenhum veículo no arquivo.',
  'import.unknownVehicle': 'alguns abastecimentos ou despesas pertencem a um veículo desconhecido.',

  'file.backup': 'carconso-backup', 'file.fills': 'carconso-abastecimentos', 'file.expenses': 'carconso-despesas',

  'csv.fills': 'veiculo|data|quilometragem_km|distancia_km|tanque_cheio|combustiveis|litros|total|preco_litro|etanol_pct|consumo_l100',
  'csv.expenses': 'veiculo|data|categoria|valor|repeticao|nota', 'csv.yes': 'sim', 'csv.no': 'não',

  'about.title': 'Sobre', 'about.source': 'Código-fonte no GitHub',
  'about.sourceSub': 'Software livre (GPL v3): consulte o código, relate um problema…',
  'about.privacy': 'Privacidade', 'about.privacySub': 'Nenhum dado coletado: tudo fica no seu dispositivo.',
  'about.offline': 'funciona offline', 'about.credits': 'Desenvolvido com a ajuda do Claude (Anthropic)',
  'about.privacyUrl': 'https://atrena.github.io/CarConso/privacy.html',
};
