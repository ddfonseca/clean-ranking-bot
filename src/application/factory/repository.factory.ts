import { MinutesRepository } from '../repository/minutes.repository'
import { UserRepository } from '../repository/user.repository'

export interface RepositoryFatory {
	createUserRepository(): UserRepository
	createMinutesRepository(): MinutesRepository
}
