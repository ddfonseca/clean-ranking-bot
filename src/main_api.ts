import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { config } from './config.env'
import PgPromiseAdapter from './pg-promise.adapter'
import AxiosAdapter from './axios.adapter'
import { GatewayHttpFactory } from './gateway-http.factory'
import { UsecaseFactory } from './usecase.factory'
import ExpressAdapter from './express.adapter'
import HttpController from './http.controller'
import { DatabaseRepositoryFactory } from './database-repository.factory'
import { QueueController } from './queue.controller'
import { RankingPublisherSubscriber } from './ranking.subscriber'
import { EventEmitter } from 'node:events'

async function main() {
	const connection = new PgPromiseAdapter(config)
	connection.connect()
	//   const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const httpClient = new AxiosAdapter()
	const gatewayFactory = new GatewayHttpFactory(httpClient, config)
	const repositoryFactory = new DatabaseRepositoryFactory(connection)
	const httpServer = new ExpressAdapter()
	const sub = new RankingPublisherSubscriber(new EventEmitter())
	const usecaseFactory = new UsecaseFactory(gatewayFactory, repositoryFactory, sub)
	new HttpController(httpServer, usecaseFactory)
	new QueueController(sub, usecaseFactory)
	httpServer.listen(config.port)
}

main()
