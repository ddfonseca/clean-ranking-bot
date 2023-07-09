import DatabaseConnection from '../database/database-connection.interface'
import { MinutesRepository } from '../../application/repository/minutes.repository'
import { UserAcumulative } from '../../domain/entity/user.entity'

export class MinutesDatabaseRepository implements MinutesRepository {
	constructor(readonly connection: DatabaseConnection) {}
	async create(userId: number, date: string, minutes: number): Promise<void> {
		await this.connection.query(
			` INSERT INTO ranking.minutes (userId, date, minutes)
			  VALUES ($1, $2, $3)
			  ON CONFLICT (userId, date) DO UPDATE
			  SET minutes = EXCLUDED.minutes;`,
			[userId, date, minutes]
		)
	}
	async getRanking(dateIn: string, dateOut: string): Promise<any> {
		const data: { name: string; username: string; total_minutes: string }[] = await this.connection.query(
			`SELECT u.name, u.username, SUM(minutes) AS total_minutes
			 FROM ranking.minutes m
			 INNER JOIN ranking.users u ON u.id = m.userId
			 WHERE date >= $1 AND date <= $2
			 GROUP BY u.id
			 ORDER BY total_minutes DESC;
			 ;`,
			[dateIn, dateOut]
		)
		if (!data) return []
		return data.map(({ name, username, total_minutes }) => new UserAcumulative(name, username, parseInt(total_minutes)))
	}
}
