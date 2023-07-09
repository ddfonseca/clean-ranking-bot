import { User } from './user.entity'

export interface UserRepository {
	findAll(): Promise<User[] | null>
	findOne(id: number): Promise<User | null>
	create(id: number, name: string, username: string): Promise<void>
	clean(): Promise<void>
}
