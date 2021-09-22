import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  
  const token = <string>req.headers["token"];
  let jwtPayload;
    
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};