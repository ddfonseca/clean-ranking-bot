import { ConfigEnv } from '../../config/config.env'
import { HttpClient } from '../http/http-client.interface'
import { TelegramGateway } from '../../application/gateway/telegram.gateway'

export class TelegramApiHttpGateway implements TelegramGateway {
	constructor(readonly httpClient: HttpClient, readonly config: ConfigEnv) {}
	async sendMessage(chatId: number, message: string): Promise<any> {
		const output = await this.httpClient.post(`https://api.telegram.org/bot${this.config.apiToken}/sendMessage`, {
			chat_id: chatId,
			text: message,
		})
		return output
	}
}
