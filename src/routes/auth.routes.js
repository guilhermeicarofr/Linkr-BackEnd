import express from "express";

import { signUp, signIn } from "../controllers/auth.controllers.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/validate.auth.js";

const authRouter = express.Router();
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", validateSignIn, signIn);

export { authRouter };
