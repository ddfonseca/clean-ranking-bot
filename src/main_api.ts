import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { config } from './config.env'
import PgPromiseAdapter from './pg-promise.adapter'
import AxiosAdapter from './axios.adapter'
import { GatewayHttpFactory } from './gateway-http.factory'
import { UsecaseFactory } from './usecase.factory'
import ExpressAdapter from './express.adapter'
import HttpController from './http.controller'

async function main() {
	const connection = new PgPromiseAdapter(config)
	connection.connect()
	//   const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const httpClient = new AxiosAdapter()
	const gatewayFactory = new GatewayHttpFactory(httpClient, config)
	const usecaseFactory = new UsecaseFactory(gatewayFactory)
	const httpServer = new ExpressAdapter()
	new HttpController(httpServer, usecaseFactory)
	httpServer.listen(8443)
}

main()
