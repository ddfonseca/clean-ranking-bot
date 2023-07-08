export const config: ConfigEnv = {
	port: process.env.PORT ? Number(process.env.PORT) : 8443,
	apiToken: process.env.API_TOKEN ?? '',
	postgresUri: process.env.POSTGRES_URI ?? '',
}

export interface ConfigEnv {
	port: number
	apiToken: string
	postgresUri: string
}
