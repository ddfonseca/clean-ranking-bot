import { GatewayFactory } from './gateway.factory'
import { TelegramGateway } from './telegram.gateway'

export class AddHour {
	telegramGateway: TelegramGateway
	constructor(readonly gatewayFactory: GatewayFactory) {
		this.telegramGateway = this.gatewayFactory.createTelegramGateway()
	}

	async execute(input: Input): Promise<Output> {
		console.log(input)
		const chatId = input?.message?.chat?.id
		const sentMessage = input?.message?.text
		// 198776455
		await this.telegramGateway.sendMessage(198776455, 'Hello')
		return { chatId, sentMessage }
		console.log({ chatId, sentMessage })
		// if (sentMessage.match(/hello/gi)) {
		// 	await this.telegramGateway.sendMessage(chatId, 'Hello back 👋')
		// 	return {}
		// }
		return {}
	}
}

type Output = {}

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
