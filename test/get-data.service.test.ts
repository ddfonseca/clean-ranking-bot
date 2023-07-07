import { getDate } from '../src/get-data.service'

test('GetData', () => {
	// Still today, after 9AM
	expect(getDate(new Date('2023-07-06T13:00:00Z'))).toBe('2023-07-06')
	expect(getDate(new Date('2023-07-06T12:01:00Z'))).toBe('2023-07-06')
	expect(getDate(new Date('2023-07-06T12:00:00Z'))).toBe('2023-07-06')

	// Yesterday, until 9AM
	expect(getDate(new Date('2023-07-06T11:59:00Z'))).toBe('2023-07-05')
	expect(getDate(new Date('2023-07-06T09:00:00Z'))).toBe('2023-07-05')
})
