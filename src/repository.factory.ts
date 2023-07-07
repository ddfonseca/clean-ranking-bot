import { MinutesRepository } from './minutes.repository'
import { UserRepository } from './user.repository'

export interface RepositoryFatory {
	createUserRepository(): UserRepository
	createMinutesRepository(): MinutesRepository
}
