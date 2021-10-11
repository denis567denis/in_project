import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Any, getRepository } from "typeorm";
import { isEmpty, validate } from "class-validator";

import { Users } from "../database/entities/Users.entity";
import config from "../config/config";

import { UnauthorizedError } from "../error/UnauthorizedError";
import { BadRequestError } from "../error/BadRequestError";

import {connection,dbManager} from "../database/connection/connection.database.connection"

import {authRepository} from "../repository/auth.repository"
import {userRepository} from "../repository/user.repository"
import { Token } from "../database/entities/Token.entity";

import cookieParser from "cookie-parser";
import { ForbiddenError } from "../error/ForbiddenError";
import { Permission } from "../database/entities/Permission.entity";
import { permissionRepository } from "../repository/permission.repository";


class AuthController {


  static Refreshtoken = async (req: Request, res: Response) => {
    if(req.cookies["Refreshtoken"]!=null){
      try{
      const refreshtoken = req.cookies["Refreshtoken"];
      res.cookie("token", refreshtoken);
      res.status(200).json(refreshtoken);
      }
      catch(error){
        throw new ForbiddenError("can not take token");    
      }
    }
    else{
      throw new UnauthorizedError("don't authorized")
    }
  };

  /**/
  static testFunction = async (req: Request, res: Response) => {
    try {
    const token = req.cookies["token"];
    // tokenEdit=cookieParser.JSONCookie(token,config.jwtSecret);
    let jwtPayload = jwt.verify(token, config.jwtSecret);
    res.status(200).json(jwtPayload);
  } catch (error) {
    throw new ForbiddenError("BADDDD");
    //throw new UnauthorizedError("don't authorized");
  }
  };

  static login = async (req: Request, res: Response) => {
    
    let { login, password } = req.body;
    if (!(login && password)) {
      throw new BadRequestError("Login or Password is empty");
    };
    let user: Users;
    try {
      user = await userRepository.findUserByLoginAndPassword(login,password);    
    const token = await  authRepository.createtoken(user);
    const refreshtoken= await authRepository.createRefreshtoken(user);
    res.cookie("token", token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
    res.cookie("Refreshtoken", refreshtoken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
    res.status(200).json(user);
  } catch (error) {
    throw new UnauthorizedError ("Not Unaurhorized");
  }
  };

  static logout = async (req: Request, res: Response) => {
    try{
      const token = req.cookies["token"];
      let jwtPayload;
      jwtPayload = jwt.verify(token, config.jwtSecret);
      const {userId, userLogin ,userRol}=jwtPayload;

      let user:Users;
      user=await userRepository.getUserById(+userId);

      let refreshtoken:Token = await authRepository.getRefreshtoken(user);
      authRepository.deleteRefreshtoken(refreshtoken);

    res.clearCookie("token");
    res.clearCookie("Refreshtoken");
    res.status(200).json("user logout");
    }
    catch(error){
      throw new ForbiddenError("can not take token");
    }
  };

  static register = async (req: Request, res: Response) => {
    try {
    let { login, password ,firstName,lastName } = req.body;
    let rol="USER";
    if (!(login && password && firstName && lastName)) {
      throw new BadRequestError("Login or Password or First Name or Last Name is empty");
    } 
    let newUser=new Users();
    newUser.login=login;
    newUser.password=password;
    newUser.firstName=firstName;
    newUser.lastName=lastName;
    newUser.rol=rol;

    let permission=new Permission(); 
    permission.mayWatch="+";
    await permissionRepository.savePermission(permission);

    newUser.permission=[permission];
    newUser.token=null;
    newUser.video=null;

    await userRepository.saveUser(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    throw new BadRequestError("User don't create")
  }
  };


  static changePassword = async (req: Request, res: Response) => {
    
    try{
      const token = req.cookies["token"];
      let jwtPayload;
      jwtPayload = jwt.verify(token, config.jwtSecret);
      const {userId, userLogin ,userRol}=jwtPayload;

    const { oldPassword , newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      throw new BadRequestError("old password or new password empty")
    }

    try {
    let user: Users ;
    user = await userRepository.getUserById(+userId);
    user.password = newPassword;
    if (user.password.length <= 0) {
      throw new BadRequestError("password is empty")
    }
    
    await userRepository.UpdateUser(user);
    await userRepository.saveUser(user);
    
    res.status(200).json(user);
  } catch (error) {
     throw new UnauthorizedError("don't change password");
  }
}catch(error){
  throw new ForbiddenError("can not tane token");
}
  };
}
export default AuthController;
