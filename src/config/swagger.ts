import swaggerJsDoc from 'swagger-jsdoc'
import * as path from 'path'

const Options = {
	swaggerDefinition: {
		openapi:"3.0.n",
		info: {
			version: `1.0.0`,
			title: `video`,
			servers: [`http://localhost:3002`],
		},
	},
	// apis: [path.join(__dirname,'../swagger/*.swagger.ts')],
	apis: ['./src/swagger/*.swagger.ts']

}

export const specs = swaggerJsDoc(Options)