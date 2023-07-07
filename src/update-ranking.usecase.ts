import { GatewayFactory } from './gateway.factory'
import { getDate } from './get-data.service'
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
		const date = getDate(new Date())
		// busca o ranking do dia acontualizado
		const dateIn = '2023-07-01'
		const dateOut = '2023-07-06'
		const users = await this.minutesRepo.getRanking(dateIn, dateOut)
		const present = new TelegramPresenter(users, dateIn, dateOut).present()

		this.telegramGateway.sendMessage(input.chatId, present)
	}
}

export type Input = { chatId: number }
export type Output = void
