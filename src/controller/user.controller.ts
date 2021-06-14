import { Router, Response, Request } from "express";
import {Users} from "../database/entities/Users.entity";
import {Permission} from "../database/entities/Permission.entity";
import {Video} from "../database/entities/Video.entity";
import {UsersService} from "../services/user.service";

export class UserController {
  public router: Router;
  private userService: UsersService; 

  constructor(){
    this.userService = new UsersService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
  }

  public view = async (req: Request, res: Response) => {
    const views = await this.userService.view();
    res.send(views).json();
  } 

  public download = async (req: Request, res: Response) => {
   
  }

  public permissionUpdate = async (req: Request, res: Response) => {
    
  }

  public delete = async (req: Request, res: Response) => {
  } 

  public routes(){
    this.router.get('/user', this.view);
    this.router.get('/user/download', this.download);
    this.router.get('/user/permission', this.permissionUpdate);
    this.router.get('/user/delete', this.delete);
  }
}