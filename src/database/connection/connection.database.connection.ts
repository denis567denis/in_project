
import ORMConfig from '../../config/ormconfig'
import { Connection, createConnection } from 'typeorm'
import { logger } from '../../config/logger'

const getDatabaseConnection = async () => {
	let connection: Connection
	try {
		connection = await createConnection(ORMConfig);
		logger.info(`connected to database ${ORMConfig.database}`);
	} catch (err) {
		logger.error(err)
	}
	return connection
}

export let connection: Connection
export let dbManager
(async () => {
	connection = await getDatabaseConnection()
	dbManager = connection.manager
})()