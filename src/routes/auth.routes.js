import express from "express";

import { signUp } from "../controllers/auth.controllers.js";
import { validateSignUp } from "../middlewares/validate.auth.js";

const authRoutes = express.Router();
authRoutes.post("/sign-up", validateSignUp, signUp);

export {authRoutes};
