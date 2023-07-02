export const config: ConfigEnv = {
	apiToken: process.env.API_TOKEN ?? '',
	postgresUri: process.env.POSTGRES_URI ?? '',
}

export interface ConfigEnv {
	apiToken: string
	postgresUri: string
}
