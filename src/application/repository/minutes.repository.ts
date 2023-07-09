import { UserAcumulative } from '../../domain/entity/user.entity'

export interface MinutesRepository {
	create(userId: number, date: string, minutes: number): Promise<void>
	getRanking(dateIn: string, dateOut: string): Promise<UserAcumulative[]>
}
