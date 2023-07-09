import moment from 'moment-timezone'

export function getDates(date: Date): { dateIn: string; dateOut: string } {
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
