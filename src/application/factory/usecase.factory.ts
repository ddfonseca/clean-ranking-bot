import { AddHour } from '../usecase/add-hour.usecase'
import { GatewayFactory } from './gateway.factory'
import { RepositoryFatory } from './repository.factory'
import { Subscriber } from '../events/subscriber.interface'
import { DailyRanking } from '../usecase/daily-ranking.usecase'
import { UpdateAcumulativeRanking } from '../usecase/acumulative-ranking.usecase'

export class UsecaseFactory {
	constructor(
		private readonly gatewayFactory: GatewayFactory,
		private readonly repositoryFactory: RepositoryFatory,
		private readonly subscriber: Subscriber
	) {}

	createAddHour() {
		return new AddHour(this.repositoryFactory, this.gatewayFactory, this.subscriber)
	}

	createDaiylyRanking() {
		return new DailyRanking(this.repositoryFactory, this.gatewayFactory)
	}

	createAcumulativeRanking() {
		return new UpdateAcumulativeRanking(this.repositoryFactory, this.gatewayFactory)
	}
}
