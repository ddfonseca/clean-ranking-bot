import { ConfigEnv } from './config.env'
import { GatewayFactory } from './gateway.factory'
import { HttpClient } from './http-client.interface'
import { TelegramApiHttpGateway } from './telegram-http.gateway'
import { TelegramGateway } from './telegram.gateway'

export class GatewayHttpFactory implements GatewayFactory {
	constructor(readonly httpClient: HttpClient, readonly config: ConfigEnv) {}

	createTelegramGateway(): TelegramGateway {
		return new TelegramApiHttpGateway(this.httpClient, this.config)
	}
}
