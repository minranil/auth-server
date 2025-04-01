import Router from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "../controllers/userController.js";

const userRouter = new Router();


export default userRouter;