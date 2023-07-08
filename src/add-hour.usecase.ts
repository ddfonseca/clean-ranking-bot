import { GatewayFactory } from './gateway.factory'
import { getTodaysDate } from './get-todays-data.service'
import { MinutesCalculator } from './match-minutes.service'
import { MinutesRepository } from './minutes.repository'
import { RepositoryFatory } from './repository.factory'
import { Subscriber } from './subscriber.interface'
import { TelegramGateway } from './telegram.gateway'
import { UserRepository } from './user.repository'

export class AddHour {
	telegramGateway: TelegramGateway
	minutesRepo: MinutesRepository
	userRepo: UserRepository
	constructor(readonly repositoryFactory: RepositoryFatory, readonly gatewayFactory: GatewayFactory, readonly publisher: Subscriber) {
		this.telegramGateway = this.gatewayFactory.createTelegramGateway()
		this.userRepo = this.repositoryFactory.createUserRepository()
		this.minutesRepo = this.repositoryFactory.createMinutesRepository()
	}

	async execute(input: Input): Promise<Output> {
		const chatId = input?.message?.chat?.id
		const re = /\/add\s+(\d{1,2})[:h]?(\d{0,2})/
		const match = re.exec(input?.message?.text) || false
		if (!match) {
			this.telegramGateway.sendMessage(chatId, 'Padrão incorreto. Exemplos: /add 3h ou /add 3h30 ou /add 3:30')
			return
		}
		const { id: userId, first_name: name, username } = input.message.from
		const user = await this.userRepo.findOne(userId)
		if (!user) {
			await this.userRepo.create(userId, name, username)
		}
		const todayT = new Date()
		const date = getTodaysDate(todayT)
		const minutes = MinutesCalculator.calculate(match)
		await this.minutesRepo.create(userId, date, minutes)
		this.publisher.publish('minutes-added', { chatId })
	}
}

type Output = void

export interface Input {
	update_id: number
	message: Message
}

export interface Message {
	message_id: number
	from: From
	chat: Chat
	date: number
	text: string
}

export interface From {
	id: number
	is_bot: boolean
	first_name: string
	username: string
	language_code: string
	is_premium: boolean
}

export interface Chat {
	id: number
	first_name: string
	username: string
	type: string
}
