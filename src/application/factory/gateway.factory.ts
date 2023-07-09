import { TelegramGateway } from '../gateway/telegram.gateway'

export interface GatewayFactory {
	createTelegramGateway(): TelegramGateway
}
