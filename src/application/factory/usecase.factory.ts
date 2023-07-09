import { AddHour } from '../usecase/add-hour.usecase'
import { GatewayFactory } from './gateway.factory'
import { RepositoryFatory } from './repository.factory'
import { Subscriber } from '../events/subscriber.interface'
import { UpdateRanking } from '../usecase/update-ranking.usecase'

export class UsecaseFactory {
	constructor(
		private readonly gatewayFactory: GatewayFactory,
		private readonly repositoryFactory: RepositoryFatory,
		private readonly subscriber: Subscriber
	) {}

	createAddHour() {
		return new AddHour(this.repositoryFactory, this.gatewayFactory, this.subscriber)
	}

	updateRanking() {
		return new UpdateRanking(this.repositoryFactory, this.gatewayFactory)
	}
}
