  import { Router } from "express";
import { videoUpload } from "../config/multer";
  import  UserController  from "../controller/user.controller";
  import { checkJwt } from "../middlewares/checkJwt..middlewares";
  import { checkRole } from "../middlewares/checkRole.middlewares";
  

  const router = Router();

  router.get("/video",checkJwt, UserController.UserVideo);       ///yes

  router.get("/CanWatchUserVideo",checkJwt,UserController.UserPermmissionVideo)   ///yes
  
  router.get("/AllVideo",checkJwt,checkRole(["ADMIN"]),UserController.AllVideo);                       ///yes

  router.get("/AllPermission",checkJwt,checkRole(["ADMIN"]),UserController.AllPermission); ///yes

  router.get("/AllUser",checkJwt,UserController.AllUser);  ///yes

  router.post("/upload",checkJwt,videoUpload.single(`video`), UserController.UploadVideo);

  router.post("/CreateVideo",checkJwt,UserController.CreateVideo);  ///yes

  router.post("/EditVideo",checkJwt,UserController.EditVideo);  ///yes
  
  router.post("/EditUser",checkJwt,checkRole(["ADMIN"]),UserController.EditUser);  ///yes

  export default router;

