import express from "express";

const userRouter = express.Router();

userRouter.get("/users/:id")

export { userRouter };