import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import jwt from "jsonwebtoken"

import { Users } from "../database/entities/Users.entity";
import { userRepository } from "../repository/user.repository";

import { isEmpty } from "class-validator";
import { Permission } from "../database/entities/Permission.entity";
import { permissionRepository } from "../repository/permission.repository";
import { videoRepository } from "../repository/video.repository";
import { Video } from "../database/entities/Video.entity";
import config from "../config/config";
import { dbManager } from "../database/connection/connection.database.connection";
import { videoUpload } from "../config/multer";
import { BadRequestError } from "../error/BadRequestError";
import { ifError } from "assert";
import { ForbiddenError } from "../error/ForbiddenError";
import { NotFoundError } from "../error/NotFoundError";

class UserController{
  

  static EditUser = async (req: Request, res: Response) => {
      let {userdelete,userId,userfirstname,userlastname,userlogin,userpassword,userRol,userPermission,userVideo}=req.body;
   if(userdelete=="no"){   
      if(!(userId && userfirstname && userlastname && userlogin && userpassword && userRol)){
        throw new BadRequestError("empty");
      }else{
      let user: Users;
      let middleUser= await userRepository.getUserById(+userId);
      if(!middleUser){
        throw new BadRequestError("can not find user")
      }
      else{ 
      user=middleUser
      user.firstName=userfirstname;
      user.lastName=userlastname;
      user.login=userlogin;
      user.password=userpassword;
      user.rol=userRol;
      if(userPermission!=undefined){
        let middlePermission= await permissionRepository.getPermissionById(+userPermission)
        if(!middlePermission){
          throw new BadRequestError("can not find permission");
        }
        let arrPermission:Permission[];
        arrPermission=[middlePermission];
        user.permission=arrPermission;
      }
      if(userVideo!=undefined){
        let middleVideo=userVideo.split(",");
        if(!middleVideo){
          throw new BadRequestError("can not find video");
        }
        let newVideo:Video[]=[];
        newVideo.length=await middleVideo.length;
      for(let a=0;a<middleVideo.length;a++){
        let newOneVideo:Video = await videoRepository.getVideoById(+middleVideo[a]);
        if(!newOneVideo){
          throw new BadRequestError("can not find video");
        }
        else{
        newVideo[a]=newOneVideo;
        }
      }
      user.video=newVideo;
      }
      userRepository.UpdateUser(user);
      userRepository.saveUser(user);
      res.status(200).json(user);
      }
      }
    }
      else{
        let user:Users;
        let userId=req.body.userId;
        if(!userId){
          throw new BadRequestError("empty user ID") 
        }
         let middleUser= await userRepository.getUserById(+userId);
      if(!middleUser){
        throw new BadRequestError("can not find user")
      }
      else{
        user=middleUser;
        userRepository.deleteUsers(user);
        res.status(201).json("delete user");
      }
      }
  };
  static EditVideo = async (req: Request, res: Response) => {
      let {videodelete,videoId,videoName,videoPermission}=req.body;
      if(videodelete=="no"){
      if(!(videoId && videoName && videoPermission)){
        throw new BadRequestError("empty");
      }
      else{
      let middlePermission=videoPermission.split(",");
        if(!middlePermission){
          throw new BadRequestError("can not find video");
        }
      let newPermission:Permission[]=[];
      newPermission.length=await middlePermission.length;
      for(let a=0;a<middlePermission.length;a++){
        let newOnePermission:Permission = await permissionRepository.getPermissionById(+middlePermission[a]);
        if(!newOnePermission){
          throw new BadRequestError("can not find permission");
        }
        else{
        newPermission[a]=newOnePermission;
        }
      }
      let video: Video;
      let middleVideo = await videoRepository.getVideoById(+videoId);
      if(!middleVideo){
        throw new BadRequestError("can not find video");
      }
      else{
      video=middleVideo;
      video.videoName=videoName;
      video.permission=newPermission;
      videoRepository.UpdateVideo(video);
      videoRepository.saveVideo(video);
      res.status(200).json(video);
      }
    }
      }
      else{
        let video:Video;
        let videoId=req.body.videoId;
        if(!videoId){
          throw new BadRequestError("empty video ID")
        }
        let middleVideo= await videoRepository.getVideoById(+req.body.videoId);
        if(!middleVideo){
          throw new BadRequestError("can not find video");
        }
        video=middleVideo;
        videoRepository.deleteVideo(video);
        res.status(201).json("delete video");
      }
  };


  static CreateVideo = async (req: Request, res: Response) => {
  
    try{
    let token = req.cookies["token"];
    let jwtPayload;
    jwtPayload = jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;
  
      let video =new Video();
      let {videoName}=req.body;
      if(!videoName){
        throw new BadRequestError("empty video name");
      }

      video.videoName=videoName;
      
      let user: Users ;
      let middleUser = await userRepository.getUserById(+userId);    
      if(!middleUser){
        throw new BadRequestError("can not find user");
      }
      user=middleUser;
      video.permission=user.permission;

      await videoRepository.saveVideo(video);
      
       user.video.push(video);
       await userRepository.UpdateUser(user);
       await userRepository.saveUser(user);
      res.status(200).json(user); 
  }
  catch(error){
    throw new ForbiddenError("can not take token");
  }
  };

  static UploadVideo = async (req: Request, res: Response) => {
    try{
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else{

      const token = req.cookies["token"];
      let jwtPayload;
      jwtPayload = jwt.verify(token, config.jwtSecret);
      const {userId, userLogin ,userRol}=jwtPayload;
    
      let user: Users ;
      let middleUser = await userRepository.getUserById(+userId);    
      if(!middleUser){
        throw new BadRequestError("can not find user");
      }
      user=middleUser;

    let videoPermission=videoRepository.getVideoByNameAndByPermission(filedata.originalname,user.permission[0])
    
    if(videoPermission){
        res.status(200).json(filedata);
    }
    else{
      res.status(200).json("you can not watch video");
    }
    }
    }catch(error){

      throw new ForbiddenError("can not take token");
      }
  };

  static UserVideo = async (req: Request, res: Response) => {
    try{
    const token = req.cookies["token"];
    let jwtPayload;
    jwtPayload = jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;
  
    let user: Users ;
      let middleUser = await userRepository.getUserById(+userId);    
      if(!middleUser){
        throw new BadRequestError("can not find user");
      }
      user=middleUser;   
    res.status(200).json(user.video);  
    }
    catch(error){
      throw new ForbiddenError("can not take token");
    }
  };

  static UserPermmissionVideo = async (req: Request, res: Response) => {
    try{
      const token = req.cookies["token"];
      let jwtPayload;
      jwtPayload = jwt.verify(token, config.jwtSecret);
      const {userId, userLogin ,userRol}=jwtPayload;
  
      
      let user: Users ;
      let middleUser = await userRepository.getUserById(+userId);    
      if(!middleUser){
        throw new BadRequestError("can not find user");
      }
      user=middleUser;
  
      let middleVideo = await videoRepository.getVideoByPermission(user.permission[0]);
      if(!middleVideo){
        throw new BadRequestError("can not take Permmision");
      }
      res.status(200).json(middleVideo);
        
      
   } catch(error){
      throw new ForbiddenError("can not take token");
    }
  };

  static AllVideo = async (req: Request, res: Response) => {
    let allvideo:Video[];
    allvideo = await videoRepository.getAllVideo();
    res.status(200).json(allvideo);
  };

  static AllPermission = async (req: Request, res: Response) => {
    let allPermission :Permission[];
    allPermission = await permissionRepository.getAllPermission();
    res.status(200).json(allPermission);
  };

  static AllUser = async (req: Request, res: Response) => {
    let allUser :Users[];
    allUser=await userRepository.getAllUser();
    res.status(200).json(allUser);
  };



};
export default UserController;
/*
edit user
{"userdelete":"no",
"userId":"2","userfirstname":"pav",
"userlastname":"pav",
"userlogin":"USER",
"userpassword":"USER",
"userRol":"USER",
"userPermission":"1",
"userVideo":"1"
}

edit video
{
  "videodelete":"no",
  "videoId":"2",
  "videoName":"456",
  "videoPermission":"1,2"
}
*/


/*
login
{
    "login":"user",
    "password":"user"
} 
*/