import pgp from 'pg-promise'
import DatabaseConnection from './database-connection.interface'
import { ConfigEnv } from './config.env'

export default class PgPromiseAdapter implements DatabaseConnection {
	connection: any

	constructor(readonly config: ConfigEnv) {
		this.connection = pgp()(this.config.postgresUri)
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params)
	}

	async close(): Promise<void> {
		await this.connection.$pool.end()
	}
}
