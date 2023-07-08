import express, { Request, Response } from 'express'
import cors from 'cors'
import { HttpServer } from './http-server.interface'

export default class ExpressAdapter implements HttpServer {
	private app: any

	constructor() {
		this.app = express()
		this.app.use(express.json())
		this.app.use(cors())
	}

	on(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body, req.headers)
				res.json(output)
			} catch (e: any) {
				console.log(e)
				res.status(422).json({
					message: e.message,
				})
			}
		})
	}

	listen(port: number): void {
		this.app.listen(port, '0.0.0.0', () => {
			console.log(`app running on ${port}`)
		})
	}
}
