import { TelegramPresenter } from '../src/telegram.presenter'
import { UserAcumulative } from '../src/user.entity'

test('TelegramPresenterTest', () => {
	const users = [
		{ name: 'david', username: 'ddfonseca', totalMinutes: 600 },
		{ name: 'renata', username: 'ret_maia', totalMinutes: 500 },
		{ name: 'renata', username: 'ret_maia', totalMinutes: 500 },
		{ name: 'renata', username: 'ret_maia', totalMinutes: 500 },
	].map(user => new UserAcumulative(user.name, user.username, user.totalMinutes))

	const telegramPresenter = new TelegramPresenter(users, '2023-07-07', '2023-07-07')
	console.log(telegramPresenter.present())
})
