import { GatewayFactory } from '../factory/gateway.factory'
import { MinutesRepository } from '../repository/minutes.repository'
import { RepositoryFatory } from '../factory/repository.factory'
import { TelegramGateway } from '../gateway/telegram.gateway'
import { TelegramPresenter } from '../../infra/presenter/telegram.presenter'
import { DatesService } from '../../domain/services/dates.service'

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
		const today = DatesService.getTodaysDate(todayT)
		this.minutesRepo.getRanking(today, today).then(users => {
			return this.telegramGateway.sendMessage(input.chatId, new TelegramPresenter(users, today, today).present())
		})
	}
}

export type Input = { chatId: number }
export type Output = void
