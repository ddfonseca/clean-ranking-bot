import PgPromiseAdapter from '../src/pg-promise.adapter'
import { UserDatabaseRepository } from '../src/user-database.repository'
import { ConfigEnv } from '../src/config.env'
import { UserRepository } from '../src/user.repository'
import { MinutesDatabaseRepository } from '../src/minutes-database.repository'
import { MinutesRepository } from '../src/minutes.repository'
import DatabaseConnection from '../src/database-connection.interface'
import { configDbTest } from './setup-db/config-db-test'

describe('MinutesRepositoryDatabase', () => {
	let connection: DatabaseConnection
	let userRepo: UserRepository
	let minutesRepo: MinutesRepository
	beforeEach(async () => {
		connection = new PgPromiseAdapter(configDbTest as ConfigEnv)
		userRepo = new UserDatabaseRepository(connection)
		minutesRepo = new MinutesDatabaseRepository(connection)
		await userRepo.clean()
	})

	afterEach(() => {
		connection.close()
	})

	test('get ranking', async () => {
		await Promise.all([userRepo.create(1, 'foo', 'foo_user'), userRepo.create(2, 'bar', 'bar_name')])
		await Promise.all([
			minutesRepo.create(1, '2023-07-01', 90),
			minutesRepo.create(1, '2023-07-02', 90),
			minutesRepo.create(1, '2023-07-03', 90),
			minutesRepo.create(2, '2023-07-01', 180),
			minutesRepo.create(2, '2023-07-02', 180),
			minutesRepo.create(2, '2023-07-03', 180),
		])
		const result = await minutesRepo.getRanking('2023-07-01', '2023-07-03')
		expect(result[0].name).toBe('bar')
		expect(result[0].username).toBe('bar_name')
		expect(result[0].totalMinutes).toBe(540)

		expect(result[1].name).toBe('foo')
		expect(result[1].username).toBe('foo_user')
		expect(result[1].totalMinutes).toBe(270)
	})
})
