import { RankingPublisherSubscriber } from '../src/ranking.subscriber'
import { EventEmitter } from 'node:events'

let emitter: EventEmitter
let rankingPublisherSubscriber: RankingPublisherSubscriber

beforeEach(() => {
	emitter = new EventEmitter()
	rankingPublisherSubscriber = new RankingPublisherSubscriber(emitter)
})
afterEach(() => {
	emitter.removeAllListeners()
})

test('subscribe method adds the event listener', () => {
	const event = 'minutes-added'
	const executor = jest.fn()

	rankingPublisherSubscriber.subscribe(event, executor)
	expect(emitter.listenerCount(event)).toBe(1)
})

test('subscribe method returns the instance of RankingPublisherSubscriber', () => {
	const event = 'minutes-added'
	const executor = jest.fn()

	const result = rankingPublisherSubscriber.subscribe(event, executor)
	expect(result).toBe(rankingPublisherSubscriber)
})

test('publish method emits the event with the payload', () => {
	const event = 'minutes-added'
	const payload = { data: 'test payload' }
	const listener = jest.fn()
	rankingPublisherSubscriber.subscribe(event, listener)
	rankingPublisherSubscriber.publish(event, payload)
	expect(listener).toHaveBeenCalledWith(payload)
})
