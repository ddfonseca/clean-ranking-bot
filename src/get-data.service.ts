import moment from 'moment-timezone'

export function getDate(date: Date): string {
	// Obtém a data e hora atual no fuso horário de São Paulo
	const now = moment(date).tz('America/Sao_Paulo')

	// Define o limite como 9:00 do dia atual
	const limit = moment(date).tz('America/Sao_Paulo').startOf('day').add(9, 'hours')

	// Se a hora atual for antes das 9:00, subtrai um dia para obter a data de ontem
	if (now.isBefore(limit)) {
		now.subtract(1, 'days')
	}

	// Retorna a data no formato 'YYYY-MM-DD'
	return now.format('YYYY-MM-DD')
}
