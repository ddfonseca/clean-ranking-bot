import { RankingEvent } from './events'
import { Subscriber } from './subscriber.interface'
import { EventEmitter } from 'node:events'

export class RankingPublisherSubscriber implements Subscriber {
	constructor(private readonly emitter: EventEmitter) {}
	subscribe(event: RankingEvent, executor: (payload: any) => any): this {
		this.emitter.on(event, executor)
		return this
	}

	publish(event: RankingEvent, payload?: any): this {
		this.emitter.emit(event, payload)
		return this
	}
}
