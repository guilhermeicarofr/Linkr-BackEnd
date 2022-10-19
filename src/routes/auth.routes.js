import express from "express";

import { signUp, signIn } from "../controllers/auth.controllers.js";
import {
  validateSignUp,
  validateSignIn,
} from "../middlewares/validate.auth.js";

const authRoutes = express.Router();
authRoutes.post("/sign-up", validateSignUp, signUp);
authRoutes.post("/sign-in", validateSignIn, signIn);

export { authRoutes };
