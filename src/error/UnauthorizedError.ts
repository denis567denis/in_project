import { ModelError } from "./ModelError"

export class UnauthorizedError extends ModelError {
		constructor(message: string) {
            super(message, 401)
        }
}