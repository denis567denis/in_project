import { Router } from "express";
import AuthController from "../controller/aut.controller";
import { checkJwt } from "../middlewares/checkJwt..middlewares";

const router = Router();


router.post("/refreshtoken",checkJwt,AuthController.Refreshtoken);

router.post("/r",AuthController.testFunction);

router.post("/login", AuthController.login);

/**
 *  @swagger
 * /auth/register:
 *  post:
 *      tags: 
 *      - user
 *      summary: User register
 *      description:
 *      operationId: register
 */
router.post("/register", AuthController.register);

router.post("/change_password", checkJwt, AuthController.changePassword);

router.post("/logout",[checkJwt],AuthController.logout);



export default router;
