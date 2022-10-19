import express from "express";
import { userPostsController } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/users/:id", userPostsController)

export { userRouter };