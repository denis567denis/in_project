import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Any, getRepository } from "typeorm";
import { validate } from "class-validator";

import { Users } from "../database/entities/Users.entity";
import config from "../config/config";

import {getConnection} from "typeorm"

class AuthController {
  static login = async (req: Request, res: Response) => {
    
    let { login, password } = req.body;
    if (!(login && password)) {
      res.status(400).send();
    }

    const userRepository = getConnection().getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail({ where: { login } });


    
    const token = jwt.sign(
      { userId: user.id, userLogin: user.login ,userRol: user.rol},
      config.jwtSecret,
      { expiresIn: "1h" }
    );

  res.setHeader("token", token);
  res.redirect('/user/');
  } catch (error) {
    res.status(401).send();
  }
  };


  static register = async (req: Request, res: Response) => {
    try {
    let { login, password ,firstName,lastName } = req.body;
    let rol="USER";
    if (!(login && password && firstName && lastName)) {
      res.status(400).send();
    } 

    let newUser=new Users();
    newUser.login=login;
    newUser.password=password;
    newUser.firstName=firstName;
    newUser.lastName=lastName;


    await getConnection().manager.save(newUser);
    res.redirect('/');
  } catch (error) {
    res.status(401).send();
  }
  };


  static changePassword = async (req: Request, res: Response) => {
    
    const id = res.locals.jwtPayload.userId;

    
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    
    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail(id);


    
    
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    
    userRepository.save(user);
    res.redirect('/');
    res.status(204).send();
  } catch (id) {
    res.status(401).send();
  }
  };
}
export default AuthController;

function where(where: any, arg1: { login: any; }) {
  throw new Error("Function not implemented.");
}
