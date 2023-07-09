export const config: ConfigEnv = {
	port: process.env.PORT ? Number(process.env.PORT) : 8080,
	apiToken: process.env.API_TOKEN ?? '',
	postgresUri: process.env.DATABASE_URL ?? '',
}

export interface ConfigEnv {
	port: number
	apiToken: string
	postgresUri: string
}
