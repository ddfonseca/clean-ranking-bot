export class MinutesCalculator {
	constructor() {}

	static calculate(match: RegExpExecArray) {
		const horas = match[1] || 0
		const minutos = match[2] || 0
		const total = Number(horas) * 60 + Number(minutos)
		return total
	}
}
