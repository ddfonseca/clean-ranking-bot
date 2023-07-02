export interface TelegramGateway {
	sendMessage(chatId: number, message: string): Promise<any>
}
