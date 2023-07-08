import { GatewayFactory } from './gateway.factory'
import { getDates } from './get-dates.service'
import { getTodaysDate } from './get-todays-data.service'
import { MinutesRepository } from './minutes.repository'
import { Presenter } from './presenter.interface'
import { RepositoryFatory } from './repository.factory'
import { TelegramGateway } from './telegram.gateway'
import { TelegramPresenter } from './telegram.presenter'

export class UpdateRanking {
	minutesRepo: MinutesRepository
	telegramGateway: TelegramGateway

	constructor(readonly repositoryFactory: RepositoryFatory, readonly gatewayFactory: GatewayFactory) {
		this.minutesRepo = repositoryFactory.createMinutesRepository()
		this.telegramGateway = gatewayFactory.createTelegramGateway()
	}

	async execute(input: Input): Promise<Output> {
		// users today
		const todayT = new Date()
		const today = getTodaysDate(todayT)
		this.minutesRepo.getRanking(today, today).then(users => {
			return this.telegramGateway.sendMessage(input.chatId, new TelegramPresenter(users, today, today).present())
		})

		// users acumualtive
		const { dateIn, dateOut } = getDates(todayT)
		if (dateIn === dateOut) return
		this.minutesRepo.getRanking(dateIn, dateOut).then(usersAcumulative => {
			return this.telegramGateway.sendMessage(input.chatId, new TelegramPresenter(usersAcumulative, dateIn, dateOut).present())
		})
	}
}

export type Input = { chatId: number }
export type Output = void
