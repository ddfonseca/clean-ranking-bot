export class User {
	constructor(readonly id: string, readonly name: string, readonly username: string) {}
}

export class UserAcumulative {
	constructor(readonly name: string, readonly username: string, readonly totalMinutes: number) {}
}
