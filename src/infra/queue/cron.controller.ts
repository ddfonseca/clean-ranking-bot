import * as cron from 'node-cron'
import { UsecaseFactory } from '../../application/factory/usecase.factory'
import { HORAS_LIQUIDAS_GROUP_ID } from '../../application/constants/horas-liquidas-group'

export class CronController {
	constructor(usecaseFactory: UsecaseFactory) {
		const acumulativeRanking = usecaseFactory.createAcumulativeRanking()
		try {
			cron.schedule('0 12 * * *', async () => acumulativeRanking.execute({ chatId: HORAS_LIQUIDAS_GROUP_ID }), {
				scheduled: true,
				timezone: 'America/Sao_Paulo',
			})
		} catch (e) {
			console.log(e)
		}
	}
}
