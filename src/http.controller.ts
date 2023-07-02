import { HttpServer } from './http-server.interface'
import { UsecaseFactory } from './usecase.factory'

// interface adapter
export default class HttpController {
	constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on('post', '/bot', async function (params: any, body: any, headers: any) {
			const addHour = usecaseFactory.createAddHour()
			const output = await addHour.execute(body)
			return output
		})
	}
}
