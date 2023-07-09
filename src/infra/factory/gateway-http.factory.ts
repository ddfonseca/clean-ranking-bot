import { ConfigEnv } from '../../config/config.env'
import { GatewayFactory } from '../../application/factory/gateway.factory'
import { HttpClient } from '../http/http-client.interface'
import { TelegramApiHttpGateway } from '../gateway/telegram-http.gateway'
import { TelegramGateway } from '../../application/gateway/telegram.gateway'

export class GatewayHttpFactory implements GatewayFactory {
	constructor(readonly httpClient: HttpClient, readonly config: ConfigEnv) {}

	createTelegramGateway(): TelegramGateway {
		return new TelegramApiHttpGateway(this.httpClient, this.config)
	}
}
