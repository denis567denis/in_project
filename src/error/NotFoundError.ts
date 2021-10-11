import { ModelError } from "./ModelError"

export class NotFoundError extends ModelError {
		constructor(message: string) {
            super(message, 404)
        }
}