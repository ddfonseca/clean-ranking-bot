import { TelegramGateway } from './telegram.gateway'

export interface GatewayFactory {
	createTelegramGateway(): TelegramGateway
}
