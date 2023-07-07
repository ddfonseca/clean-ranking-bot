import { RankingPublisherSubscriber } from '../src/ranking.subscriber'
import { EventEmitter } from 'node:events'

test('', () => {
	expect(1).toBe(1)
})

// test('Ranking Subscriber Test', () => {
// 	const eventEmitter = new EventEmitter()
// 	const ranking_ps = new RankingPublisherSubscriber(eventEmitter)
// 	ranking_ps.publish('minutes-added')
// 	ranking_ps.subscribe('minutes-added', payload => {
// 		console.log(payload)
// 	})

// })
