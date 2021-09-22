  import { Router } from "express";
  import {userController} from "../controller/user.controller";
  import {videoController} from "../controller/video.controller";
  import {permissionController} from "../controller/permission.controller";

  import { checkJwt } from "../middlewares/checkJwt..middlewares";
  import jwt from "jsonwebtoken";
  import config from "../config/config";
  import { checkRole } from "../middlewares/checkRole.middlewares";
  import multer from "multer";
  import {videoUpload} from"../config/multer";


import {Video} from "../database/entities/Video.entity";
import{Permission} from "../database/entities/Permission.entity"
import {Users} from "../database/entities/Users.entity";
import { getConnection } from "typeorm";
import { isEmpty } from "class-validator";

  const router = Router();
  
  
  router.get("/",checkJwt,async function(req, res, next) {
    const token = <string>req.headers["token"];
  let jwtPayload;
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;
    res.send()
    if(userRol=="ADMIN"){
    let Allvideo:Video[] = await videoController.getAllVideo();
    res.send(Allvideo.map(video=>`<form action="/user/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="${video.videoName}" />
  </form>`));
      res.sendFile('D:/lab/project/src/view/admin_menu.html');
    }
    else{
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;
    let permission :Permission= await permissionController.getPermissionById(userId);
      let UserAllvideo:Video[] = await videoController.getVideoByPermission(permission);
    res.send(UserAllvideo.map(video=>`<form action="/user/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="${video.videoName}" />
  </form>`));
      res.sendFile('D:/lab/project/src/view/user_menu.html');
    }
    next();
});

router.post("/upload",checkJwt, function(req,res,next){
  videoUpload.fields (req.body.video);
  res.send(req.files);
})

  router.get("/CreateVideo",checkJwt,function(req,res,next){
   res.sendFile('D:/lab/project/src/view/add_video.html'); 
  });

  router.post("/CreateVideo",checkJwt,async function(req,res,next){
    
    let video =new Video();
    video.videoName=req.body.videoName;
    

    const token = <string>req.headers["token"];
    let jwtPayload;
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;

    
    const user: Users = await userController.getUserById(userId);    
    const permissionUser: Permission[] = await permissionController.getPermissionByUser(user);

    video.permission=permissionUser;
    await getConnection().manager.save(video);
    user.video.push(video);
    userController.UpdateUser(user);
    res.sendFile('D:/lab/project/src/view/user_menu.html');
   });
   router.get("/DeleteVideo",checkJwt,function(req,res,next){
    res.sendFile('D:/lab/project/src/view/delete_video.html'); 
   });
  router.post("/DeleteVideo",checkJwt,async function(req,res,next){
    let videoId=req.body.videoId;

    const token = <string>req.headers["token"];
    let jwtPayload;
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    const {userId, userLogin ,userRol}=jwtPayload;

    const video:Video = await videoController.getVideoById(videoId);
    videoController.deleteVideo(video);
    res.sendFile('D:/lab/project/src/view/user_menu.html');
  });
  router.get("/AllUser",checkJwt,checkRole(["ADMIN"]),async function(req,res,next){
    let Alluser:Users[] = await userController.getAllUser();
    res.send(Alluser.map(user=>`<br><h3>ID:${user.id}</h3><br>
    Имя пользваотеля:${user.firstName}<br>
    Фамилия пользваотеля:${user.lastName}<br>
    Логин пользваотеля:${user.login}<br>
    Пароль пользваотеля:${user.password}<br>
    Разрешения пользваотеля:${user.permission}<br>
    Видео пользователя:${user.video}<br>
    Роль пользователя:${user.rol}<br><br>    
    `));
    res.sendFile('D:/lab/project/src/view/all_user.html');
  });
  router.get("/EditUser",checkJwt,checkRole(["ADMIN"]),function(req,res,next){
    res.sendFile('D:/lab/project/src/view/edit_user.html');
  });
  router.post("/EditUser",checkJwt,checkRole(["ADMIN"]),async function(req,res,next){
    if(!isEmpty(req.body.delete)){
    let userId:number=req.body.userId;
    let userfirstname=req.body.userfirstname;
    let userlastname=req.body.userlastname;
    let userlogin=req.body.login;
    let userpassword=req.body.password;
    let userRol=req.body.rol;
    let user: Users= await userController.getUserById(userId);
    user.firstName=userfirstname;
    user.lastName=userlastname;
    user.login=userlogin;
    user.password=userpassword;
    user.rol=userRol;
    userController.UpdateUser(user);
    }
    else{
      let user:Users= await userController.getUserById(req.body.userId);
      userController.deleteUsers(user);
    }
    res.sendFile('D:/lab/project/src/view/all_user.html');
  });

  router.get("/EditVideo",checkJwt,checkRole(["ADMIN"]),function(req,res,next){
    res.sendFile('D:/lab/project/src/view/edit_video.html');
  });
  router.post("/EditVideo",checkJwt,checkRole(["ADMIN"]),async function(req,res,next){
    if(isEmpty(req.body.delete)){
    let videoId:number=req.body.videoId;
    let videoName=req.body.videoName;
    let videoPermission = req.body.permission.split(",");
    let newPermission:Permission[];
    for(let a=0;a<videoPermission.length;a++){
      let newOnePermission:Permission = await permissionController.getPermissionById(+videoPermission[a]);
      newPermission.push(newOnePermission);
    }
    let video: Video= await videoController.getVideoById(videoId);
    video.videoName=videoName;
    video.permission=newPermission;
    videoController.UpdateVideo(video);
    }
    else{
      let video:Video= await videoController.getVideoById(req.body.videoId);
      videoController.deleteVideo(video);
    }
    res.sendFile('D:/lab/project/src/view/all_video.html');
  });
  /*
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["USER","ADMIN"])],
  VideoController.deleteVideo
);
*/
  export default router;