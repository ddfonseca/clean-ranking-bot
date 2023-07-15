import { GatewayFactory } from '../factory/gateway.factory'
import { MinutesRepository } from '../repository/minutes.repository'
import { RepositoryFatory } from '../factory/repository.factory'
import { TelegramGateway } from '../gateway/telegram.gateway'
import { TelegramPresenter } from '../../infra/presenter/telegram.presenter'
import { DatesService } from '../../domain/services/dates.service'

export class UpdateAcumulativeRanking {
	minutesRepo: MinutesRepository
	telegramGateway: TelegramGateway

	constructor(readonly repositoryFactory: RepositoryFatory, readonly gatewayFactory: GatewayFactory) {
		this.minutesRepo = repositoryFactory.createMinutesRepository()
		this.telegramGateway = gatewayFactory.createTelegramGateway()
	}

	async execute(input: Input): Promise<Output> {
		// users acumualtive
		const { dateIn, dateOut } = DatesService.getDatesFromTheSameWeek(new Date())
		if (dateIn === dateOut) return
		this.minutesRepo.getRanking(dateIn, dateOut).then(usersAcumulative => {
			return this.telegramGateway.sendMessage(input.chatId, new TelegramPresenter(usersAcumulative, dateIn, dateOut).present())
		})
	}
}

export type Input = { chatId: number }
export type Output = void
