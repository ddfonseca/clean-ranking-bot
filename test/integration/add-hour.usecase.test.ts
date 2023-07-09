import { AddHour } from '../../src/application/usecase/add-hour.usecase'
import { GatewayFactory } from '../../src/application/factory/gateway.factory'
import { TelegramGateway } from '../../src/application/gateway/telegram.gateway'

test('First setup for AddHour', async () => {
	const gatewayFactory: Pick<GatewayFactory, 'createTelegramGateway'> = {
		createTelegramGateway: function (): TelegramGateway {
			return {
				sendMessage: async function (chatId: number, message: string): Promise<any> {
					console.log({ chatId, message })
				},
			}
		},
	}
	// const addHour = new AddHour(gatewayFactory)
	// const output = await addHour.execute({
	// 	update_id: 0,
	// 	message: {
	// 		message_id: 0,
	// 		from: {
	// 			id: 0,
	// 			is_bot: false,
	// 			first_name: 'David',
	// 			username: '',
	// 			language_code: '',
	// 			is_premium: false,
	// 		},
	// 		chat: {
	// 			id: 0,
	// 			first_name: 'David',
	// 			username: '',
	// 			type: '',
	// 		},
	// 		date: Date.now(),
	// 		text: 'hello',
	// 	},
	// })
	// console.log(output)
})
