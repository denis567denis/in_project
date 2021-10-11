import { Router, Request, Response } from "express";

import {Video} from "../database/entities/Video.entity";
import {Users} from "../database/entities/Users.entity";
import {Permission} from "../database/entities/Permission.entity";


import auth from "./auth.services";
import user from "./user.services";
import {connection} from "../database/connection/connection.database.connection"

const services = Router();

services.use("/auth", auth)
services.use("/user", user);
services.get("/",function(req,res,next){
   let d= connection;
})

export default services;