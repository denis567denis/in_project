import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Users } from "../database/entities/Users.entity";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    const id = res.locals.jwtPayload.userId;

    
    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail(id);
    
        if (roles.indexOf(user.rol) > -1) next();

    else res.status(401).send();

} catch (id) {
    res.status(401).send();
  }
  };
};