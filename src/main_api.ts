import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { config } from './config/config.env'
import PgPromiseAdapter from './infra/database/pg-promise.adapter'
import AxiosAdapter from './infra/http/axios.adapter'
import { GatewayHttpFactory } from './infra/factory/gateway-http.factory'
import { UsecaseFactory } from './application/factory/usecase.factory'
import ExpressAdapter from './infra/http/express.adapter'
import HttpController from './infra/http/http.controller'
import { DatabaseRepositoryFactory } from './infra/factory/database-repository.factory'
import { QueueController } from './application/events/queue.controller'
import { RankingPublisherSubscriber } from './application/events/ranking.subscriber'
import { EventEmitter } from 'node:events'

async function main() {
	const connection = new PgPromiseAdapter(config)
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
