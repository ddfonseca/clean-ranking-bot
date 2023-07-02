import { AddHour } from './add-hour.usecase'
import { GatewayFactory } from './gateway.factory'

export class UsecaseFactory {
	constructor(readonly gatewayFactory: GatewayFactory) {}

	createAddHour() {
		return new AddHour(this.gatewayFactory)
	}
}
