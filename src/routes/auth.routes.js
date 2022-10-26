import express from "express";

import { validateSchema } from "../middlewares/schema.middleware.js";
import { schemaSignIn, schemaSignUp } from "../schemas/auth.schema.js";
import { signUp, signIn } from "../controllers/auth.controllers.js";

const authRouter = express.Router();
authRouter.post("/sign-up", validateSchema(schemaSignUp), signUp);
authRouter.post("/sign-in", validateSchema(schemaSignIn), signIn);

export { authRouter };
