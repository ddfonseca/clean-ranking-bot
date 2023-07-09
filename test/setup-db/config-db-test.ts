import { ConfigEnv } from '../../src/config.env'

export const configDbTest: Pick<ConfigEnv, 'postgresUri'> = {
	postgresUri: 'postgres://admin:123456@localhost:5432/ranking',
}
