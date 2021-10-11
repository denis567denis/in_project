import { ModelError } from "./ModelError"

export class BadRequestError extends ModelError {
		constructor(message: string) {
            super(message, 400)
        }
}