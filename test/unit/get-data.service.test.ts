import { getTodaysDate } from '../../src/domain/services/get-todays-data.service'

test('GetData', () => {
	// Still today, after 9AM
	expect(getTodaysDate(new Date('2023-07-06T13:00:00Z'))).toBe('2023-07-06')
	expect(getTodaysDate(new Date('2023-07-06T12:01:00Z'))).toBe('2023-07-06')
	expect(getTodaysDate(new Date('2023-07-06T12:00:00Z'))).toBe('2023-07-06')

	// Yesterday, until 9AM
	expect(getTodaysDate(new Date('2023-07-06T11:59:00Z'))).toBe('2023-07-05')
	expect(getTodaysDate(new Date('2023-07-06T09:00:00Z'))).toBe('2023-07-05')
})
