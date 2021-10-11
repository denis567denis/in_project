import { ModelError } from "./ModelError"

export class ForbiddenError extends ModelError {
		constructor(message: string) {
            super(message, 403)
        }
}
