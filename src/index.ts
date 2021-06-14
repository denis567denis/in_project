import express, {Request, Response} from 'express';
import {getConnection} from "typeorm";
import { UserController } from './controller/user.controller';

class Server {
  private userController: UserController;
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }


  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
  }

  /**
   *  function token jwt 
*/
/*
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
*/


  /**
   * Method to configure the routes
   */
  public async routes(){
    
    const con=getConnection();

    this.userController = new UserController();

    this.app.get( "/", (req: Request, res: Response ) => {
      
      res.send( "Hello world!" );
    });

    this.app.use(`/api/posts/`,this.userController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server