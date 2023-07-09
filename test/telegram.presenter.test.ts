import { TelegramPresenter } from '../src/telegram.presenter'
import { UserAcumulative } from '../src/user.entity'

test('TelegramPresenterTest', () => {
	const users = [
		{ name: 'David', username: 'ddfonseca', totalMinutes: 600 },
		{ name: 'Renata', username: 'ret_maia', totalMinutes: 500 },
		{ name: 'Fulano', username: 'fulano', totalMinutes: 400 },
		{ name: 'Beltrano', username: 'beltrano', totalMinutes: 300 },
	].map(user => new UserAcumulative(user.name, user.username, user.totalMinutes))

	const telegramPresenter = new TelegramPresenter(users, '2023-07-07', '2023-07-07')
	expect(telegramPresenter.present()).toBe(
		'# Ranking de 07 de julho de 2023 🏆\n\nDavid - 10h 🥇\nRenata - 8h20min 🥈\nFulano - 6h40min 🥉\nBeltrano - 5h\n'
	)
})
