import PgPromiseAdapter from '../src/pg-promise.adapter'
import { UserDatabaseRepository } from '../src/user-database.repository'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.development` })
import { config } from '../src/config.env'
import { UserRepository } from '../src/user.repository'
import DatabaseConnection from '../src/datavase-connection.interface'
import { MinutesDatabaseRepository } from '../src/minutes-database.repository'
import { MinutesRepository } from '../src/minutes.repository'

describe('UserRepositoryDatabase', () => {
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

	test('create user', async () => {
		await userRepo.create(2, 'B', 'bb')
		const result = await userRepo.findOne(2)
		expect(result?.id).toBe(2)
		expect(result?.name).toBe('B')
		expect(result?.username).toBe('bb')
		const promise = userRepo.create(2, 'B', 'bb')
		await expect(promise).rejects.toThrow('duplicated user')
	})

	test('create users and delete users', async () => {
		await Promise.all([userRepo.create(1, 'a', 'aa'), userRepo.create(2, 'B', 'bb')])
		await Promise.all([minutesRepo.create(1, '2023-07-06', 90), minutesRepo.create(2, '2023-07-06', 180)])
		expect(await userRepo.findAll()).toHaveLength(2)
		await userRepo.clean()
		expect(await userRepo.findAll()).toHaveLength(0)
	})
})
