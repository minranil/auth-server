import Router from "express";
import authController from "../controllers/authController.js";
import { validateSignupUserData }  from "../middleware/validation.middleware.js"
import { authLimiter } from "../middleware/limiter.middleware.js";

const authRouter = new Router();


authRouter.post('/signup', authLimiter, validateSignupUserData, authController.signup);
authRouter.post('/signin', authLimiter, authController.signin);


export default authRouter;