export class ModelError extends Error {
	constructor(public message: string, public status: number) {
		super()
		Object.setPrototypeOf(this, ModelError.prototype)
	}
}