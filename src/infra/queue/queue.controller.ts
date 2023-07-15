import { Subscriber } from '../../application/events/subscriber.interface'
import { UsecaseFactory } from '../../application/factory/usecase.factory'

export class QueueController {
	constructor(sub: Subscriber, usecaseFactory: UsecaseFactory) {
		const dailyRanking = usecaseFactory.createDaiylyRanking()
		sub.subscribe('minutes-added', (payload: { chatId: number }) => {
			dailyRanking.execute(payload)
		})
	}
}
