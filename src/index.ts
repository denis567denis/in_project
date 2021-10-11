import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import services from "./services/index.service";
import { json, urlencoded } from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { specs } from './config/swagger'
import * as swaggerUi from 'swagger-ui-express'
import { errorMiddleware } from './middlewares/Error.middlewares'
var cookieParser = require('cookie-parser')

const PORT = 3002;

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use("/", services);

  app.use(cors())
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(specs))

app.use(errorMiddleware)

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch(error => console.log(error));