import express from "express";
import { userPostsController } from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";

const userRouter = express.Router();

userRouter.get("/user/:id", validateToken, userPostsController);

export { userRouter };
