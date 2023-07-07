import { RankingEvent } from './events'

export interface Subscriber {
	subscribe(event: RankingEvent, executor: (payload?: any) => any | Promise<any>): this
	publish(event: RankingEvent, payload?: any): this
}
