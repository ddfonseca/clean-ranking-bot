import moment from 'moment-timezone'

export class DatesService {
	static getDatesFromTheSameWeek(date: Date): { dateIn: string; dateOut: string } {
		const today = moment(date).tz('America/Sao_Paulo')
		const dayOfWeek = today.day()

		let dateIn: moment.Moment
		let dateOut: moment.Moment

		if (dayOfWeek === 1) {
			// Se hoje é segunda-feira
			dateIn = today.clone().subtract(7, 'days').startOf('isoWeek')
			dateOut = today.clone().subtract(1, 'days').startOf('day')
		} else {
			// Se hoje é depois de segunda-feira
			dateIn = today.clone().startOf('isoWeek')
			dateOut = today.clone().subtract(1, 'days').startOf('day')
		}

		return {
			dateIn: dateIn.format('YYYY-MM-DD'),
			dateOut: dateOut.format('YYYY-MM-DD'),
		}
	}

	static getTodaysDate(date: Date): string {
		// Obtém a data e hora atual no fuso horário de São Paulo
		const now = moment(date).tz('America/Sao_Paulo')

		// Define o limite como 9:00 do dia atual
		const limit = moment(date).tz('America/Sao_Paulo').startOf('day').add(9, 'hours')

		// Se a hora atual for antes das 9:00, subtrai um dia para obter a data de ontem
		if (now.isBefore(limit)) {
			now.subtract(1, 'days')
		}
		return now.format('YYYY-MM-DD')
	}
}
