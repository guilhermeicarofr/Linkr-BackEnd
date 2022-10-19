import express from "express";

import { signUp } from "../controllers/users.js";
import { validateSignUp } from "../middlewares/validate-users.js";

const router = express.Router();
router.post("/sign-up", validateSignUp, signUp);

export default router;
