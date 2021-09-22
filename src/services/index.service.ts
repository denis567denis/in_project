import { Router, Request, Response } from "express";

import auth from "./auth.sevices";
import user from "./user.service";
import {connection} from "../database/connection/connection.database.connection"

const services = Router();

services.use("/auth", auth)
services.use("/user", user);
services.get("/",function(req,res,next){
    let connect=connection;
    res.sendFile( 'D:/lab/project/src/view/indexGuest.view.html');
})

export default services;