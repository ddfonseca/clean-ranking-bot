import { HttpServer } from './http-server.interface'
import { UsecaseFactory } from '../../application/factory/usecase.factory'

// interface adapter
export default class HttpController {
	constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on('post', '/bot', async function (params: any, body: any, headers: any) {
			if (body?.edited_message) return
			const sentMessage = body?.message?.text
			if (sentMessage.match(/\/add/gi)) {
				const addHour = usecaseFactory.createAddHour()
				const output = await addHour.execute(body)
				return output
			}
			return {}
		})
	}
}
