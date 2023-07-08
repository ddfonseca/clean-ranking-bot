import { Presenter } from './presenter.interface'
import { UserAcumulative } from './user.entity'
import moment from 'moment-timezone'

export class TelegramPresenter implements Presenter {
	constructor(private readonly usersAcumulative: UserAcumulative[], private readonly dateIn: string, private readonly dateOut: string) {}

	present() {
		let acc = this.title
		for (const [idx, user] of this.usersAcumulative.entries()) {
			const hora = Math.floor(user.totalMinutes / 60)
			let minuto: string | number = user.totalMinutes % 60
			if (minuto < 10 && minuto != 0) minuto = `0${minuto}`
			minuto ? (acc += `${user.name} - ${hora}h${minuto}min`) : (acc += `${user.name} - ${hora}h`)
			if (idx === 0) acc += ' 🥇\n'
			else if (idx === 1) acc += ' 🥈\n'
			else if (idx === 2) acc += ' 🥉\n'
			else acc += '\n'
		}
		return acc
	}

	get title() {
		if (this.dateIn === this.dateOut) {
			const formattedDate = moment(this.dateIn).locale('pt-br').format('DD [de] MMMM [de] YYYY')
			return `# Ranking de ${formattedDate} 🏆\n\n`
		}
		const formattedDateIn = moment(this.dateIn).locale('pt-br').format('DD [de] MMMM [de] YYYY')
		const formattedDateOut = moment(this.dateOut).locale('pt-br').format('DD [de] MMMM [de] YYYY')
		const diffInDays = moment(this.dateOut).diff(moment(this.dateIn), 'days') + 1
		const diffText = diffInDays > 1 ? `${diffInDays} dias` : `${diffInDays} dia`

		return `# Ranking acumulativo (${diffText})\nEntre as datas ${formattedDateIn} e ${formattedDateOut} 🏆\n\n`
	}
}
