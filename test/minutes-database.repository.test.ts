import PgPromiseAdapter from '../src/pg-promise.adapter'
import { UserDatabaseRepository } from '../src/user-database.repository'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.development` })
import { config } from '../src/config.env'
import { UserRepository } from '../src/user.repository'
import DatabaseConnection from '../src/datavase-connection.interface'
import { MinutesDatabaseRepository } from '../src/minutes-database.repository'
import { MinutesRepository } from '../src/minutes.repository'

describe('MinutesRepositoryDatabase', () => {
	let connection: DatabaseConnection
	let userRepo: UserRepository
	let minutesRepo: MinutesRepository
	beforeEach(async () => {
		connection = new PgPromiseAdapter(config)
		connection.connect()
		userRepo = new UserDatabaseRepository(connection)
		minutesRepo = new MinutesDatabaseRepository(connection)
		await userRepo.clean()
	})

	afterEach(() => {
		connection.close()
	})

	test('get ranking', async () => {
		await Promise.all([userRepo.create(1, 'a', 'aa'), userRepo.create(2, 'B', 'bb')])
		await Promise.all([
			minutesRepo.create(1, '2023-07-01', 90),
			minutesRepo.create(1, '2023-07-02', 90),
			minutesRepo.create(1, '2023-07-03', 90),
			minutesRepo.create(2, '2023-07-01', 180),
			minutesRepo.create(2, '2023-07-02', 180),
			minutesRepo.create(2, '2023-07-03', 180),
		])
		const result = await minutesRepo.getRanking('2023-07-01', '2023-07-03')
		console.log(result)
	})
})
