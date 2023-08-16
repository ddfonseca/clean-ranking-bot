import { HttpServer } from './http-server.interface'
import { UsecaseFactory } from '../../application/factory/usecase.factory'

// interface adapter
export default class HttpController {
	constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on('post', '/bot', async function (params: any, body: any, headers: any) {
			if (body?.edited_message) return
			if (body?.left_chat_participant) return
			const sentMessage = body?.message?.text
			if (sentMessage.match(/\/add/gi)) {
				const addHour = usecaseFactory.createAddHour()
				await addHour.execute(body)
				return
			}
		})

		httpServer.on('get', '/', async function (params: any, body: any, headers: any) {
			return 'Hello world'
		})
	}
}
