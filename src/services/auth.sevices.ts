import { Router } from "express";
import AuthController from "../controller/aut.controller";
import { checkJwt } from "../middlewares/checkJwt..middlewares";

const router = Router();
//Login route
router.post("/login", AuthController.login);
//Register route
router.post("/register", AuthController.register);
router.get("/register", function(req,res){
    res.sendFile(__dirname + 'src/view/register.view.html');
})
//Change my password
router.post("/change_password", [checkJwt], AuthController.changePassword);
router.get("/change-password", function(req,res){
    res.sendFile(__dirname + 'src/view/change_password.html');
})
export default router;