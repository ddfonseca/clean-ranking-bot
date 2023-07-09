import DatabaseConnection from './database-connection.interface'
import { MinutesDatabaseRepository } from './minutes-database.repository'
import { MinutesRepository } from './minutes.repository'
import { RepositoryFatory } from './repository.factory'
import { UserDatabaseRepository } from './user-database.repository'
import { UserRepository } from './user.repository'

export class DatabaseRepositoryFactory implements RepositoryFatory {
	constructor(readonly connection: DatabaseConnection) {}
	createUserRepository(): UserRepository {
		return new UserDatabaseRepository(this.connection)
	}
	createMinutesRepository(): MinutesRepository {
		return new MinutesDatabaseRepository(this.connection)
	}
}
