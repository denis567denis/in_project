import { logger } from '../config/logger'
import { ModelError } from '../error/ModelError'

export const errorMiddleware = (err, req, res, next) => {
	logger.error(err)
	if (err instanceof ModelError) {
		res.status(err.status).json({ message: err.message })
	} else {
		res.status(500).json({ message: err.message })
	}
}