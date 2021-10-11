import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { UnauthorizedError } from "../error/UnauthorizedError";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.cookies["token"];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new UnauthorizedError("don't authorized");
  }

  next();
};