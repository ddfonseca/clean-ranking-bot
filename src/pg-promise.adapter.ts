import pgp from 'pg-promise'
import DatabaseConnection from './datavase-connection.interface'
import { ConfigEnv } from './config.env'

export default class PgPromiseAdapter implements DatabaseConnection {
	connection: any

	constructor(readonly config: ConfigEnv) {}

	async connect(): Promise<void> {
		this.connection = pgp()(this.config.postgresUri)
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params)
	}

	async close(): Promise<void> {
		await this.connection.$pool.end()
	}
}
