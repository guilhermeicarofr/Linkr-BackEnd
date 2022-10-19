import express from "express";

import { signUp } from "../controllers/auth.controllers.js";
import { validateSignUp } from "../middlewares/validate.auth.js";

const authRouter = express.Router();
authRouter.post("/sign-up", validateSignUp, signUp);

export {authRouter};
