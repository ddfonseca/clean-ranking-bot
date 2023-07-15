import { DatesService } from '../../src/domain/services/dates.service'

it('should return the previous Monday and yesterday if the provided date is a Monday', () => {
	const date = new Date('2023-07-03T10:00:00Z')
	const result = DatesService.getDatesFromTheSameWeek(date)
	expect(result.dateIn).toBe('2023-06-26')
	expect(result.dateOut).toBe('2023-07-02')
})

it('should return the Monday of the current week and yesterday if the provided date is after Monday', () => {
	const date = new Date('2023-07-08T10:00:00Z')
	const result = DatesService.getDatesFromTheSameWeek(date)
	expect(result.dateIn).toBe('2023-07-03')
	expect(result.dateOut).toBe('2023-07-07')
})

it('should return the previous Monday and yesterday if the provided date is a Tuesday', () => {
	const date = new Date('2023-07-04T10:00:00Z')
	const result = DatesService.getDatesFromTheSameWeek(date)
	expect(result.dateIn).toBe('2023-07-03')
	expect(result.dateOut).toBe('2023-07-03')
})

it('should return the previous Monday and yesterday if the provided date is a Sunday', () => {
	const date = new Date('2023-07-09T10:00:00Z')
	const result = DatesService.getDatesFromTheSameWeek(date)
	expect(result.dateIn).toBe('2023-07-03')
	expect(result.dateOut).toBe('2023-07-08')
})

it('should return the previous Monday and yesterday if the provided date is in a different week', () => {
	const date = new Date('2023-07-10T10:00:00Z')
	const result = DatesService.getDatesFromTheSameWeek(date)
	expect(result.dateIn).toBe('2023-07-03')
	expect(result.dateOut).toBe('2023-07-09')
})
test('GetData', () => {
	// Still today, after 9AM
	expect(DatesService.getTodaysDate(new Date('2023-07-06T13:00:00Z'))).toBe('2023-07-06')
	expect(DatesService.getTodaysDate(new Date('2023-07-06T12:01:00Z'))).toBe('2023-07-06')
	expect(DatesService.getTodaysDate(new Date('2023-07-06T12:00:00Z'))).toBe('2023-07-06')

	// Yesterday, until 9AM
	expect(DatesService.getTodaysDate(new Date('2023-07-06T11:59:00Z'))).toBe('2023-07-05')
	expect(DatesService.getTodaysDate(new Date('2023-07-06T09:00:00Z'))).toBe('2023-07-05')
})
