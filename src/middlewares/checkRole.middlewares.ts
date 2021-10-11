import { Request, Response, NextFunction } from "express";
import {connection , dbManager} from "../database/connection/connection.database.connection";
import jwt from "jsonwebtoken"
import config from "../config/config";
import { userRepository} from "../repository/user.repository";

import { Users } from "../database/entities/Users.entity";
import { UnauthorizedError } from "../error/UnauthorizedError";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    try{
      let token = req.cookies["token"];
      let jwtPayload;
      jwtPayload = jwt.verify(token, config.jwtSecret);
      let {userId, userLogin ,userRol}=jwtPayload;

      let user: Users;
    
      let middleUser = await userRepository.getUserById(+userId);
    if(!middleUser){
      throw new UnauthorizedError("don t authized");
    }
    user=middleUser;
        if (roles.indexOf(user.rol) > -1) next();

    else throw new UnauthorizedError("have not rol");

} catch (userId) {
  throw new UnauthorizedError("don't authorized");
  }
    
  };
};