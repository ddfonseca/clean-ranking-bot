import DatabaseConnection from '../database/database-connection.interface'
import { MinutesDatabaseRepository } from '../repository/minutes-database.repository'
import { MinutesRepository } from '../../application/repository/minutes.repository'
import { RepositoryFatory } from '../../application/factory/repository.factory'
import { UserDatabaseRepository } from '../repository/user-database.repository'
import { UserRepository } from '../../application/repository/user.repository'

export class DatabaseRepositoryFactory implements RepositoryFatory {
	constructor(readonly connection: DatabaseConnection) {}
	createUserRepository(): UserRepository {
		return new UserDatabaseRepository(this.connection)
	}
	createMinutesRepository(): MinutesRepository {
		return new MinutesDatabaseRepository(this.connection)
	}
}
