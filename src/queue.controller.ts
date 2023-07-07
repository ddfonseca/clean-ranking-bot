import { Subscriber } from './subscriber.interface'
import { UsecaseFactory } from './usecase.factory'

export class QueueController {
	constructor(sub: Subscriber, usecaseFactory: UsecaseFactory) {
		const updateRanking = usecaseFactory.updateRanking()
		sub.subscribe('minutes-added', (payload: { chatId: number }) => {
			updateRanking.execute(payload)
		})
	}
}
