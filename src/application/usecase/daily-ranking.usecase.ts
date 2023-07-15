import { GatewayFactory } from '../factory/gateway.factory'
import { getDates } from '../../domain/services/get-dates.service'
import { getTodaysDate } from '../../domain/services/get-todays-data.service'
import { MinutesRepository } from '../repository/minutes.repository'
import { Presenter } from '../../infra/presenter/presenter.interface'
import { RepositoryFatory } from '../factory/repository.factory'
import { TelegramGateway } from '../gateway/telegram.gateway'
import { TelegramPresenter } from '../../infra/presenter/telegram.presenter'

export class DailyRanking {
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
	}
}

export type Input = { chatId: number }
export type Output = void
