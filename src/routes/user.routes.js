import express from "express";

import { getUsersByName, getUserPosts } from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";

const userRouter = express.Router();

userRouter.get("/user/:id", validateToken, getUserPosts);
userRouter.get("/user", validateToken, getUsersByName);

export { userRouter };
