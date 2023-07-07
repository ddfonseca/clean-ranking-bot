import DatabaseConnection from './datavase-connection.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

export class UserDatabaseRepository implements UserRepository {
	constructor(readonly connection: DatabaseConnection) {}

	async create(id: number, name: string, username: string): Promise<void> {
		try {
			await this.connection.query('INSERT INTO ranking.users (id, name, username) VALUES ($1, $2, $3)', [id, name, username])
		} catch (err: any) {
			if (err.code === '23505') {
				throw new Error('duplicated user')
			}
		}
	}

	async findOne(id: number): Promise<User | null> {
		const [userData] = await this.connection.query('SELECT * FROM ranking.users WHERE id = $1', [id])
		if (!userData) return null
		return new User(userData.id, userData.name, userData.username)
	}

	async findAll(): Promise<User[]> {
		const usersData = await this.connection.query('SELECT * FROM ranking.users', [])
		return usersData.map((userData: any) => new User(userData.id, userData.name, userData.username))
	}

	async clean(): Promise<void> {
		await this.connection.query('DELETE FROM ranking.minutes WHERE userId IN (SELECT id FROM ranking.users);', [])
		await this.connection.query('DELETE FROM ranking.users', [])
	}
}
