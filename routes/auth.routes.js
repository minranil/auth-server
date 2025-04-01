import Router from "express";
import authController from "../controllers/authController.js";
import { validateSignupUserData }  from "../middleware/validation.middleware.js"

const authRouter = new Router();


authRouter.post('/signup',  validateSignupUserData, authController.signup);
authRouter.post('/signin', authController.signin);


export default authRouter;