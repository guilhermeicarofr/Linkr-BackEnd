import express from "express";
import { postFollow } from "../controllers/follow.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";

const followRouter = express.Router();

followRouter.post("/follow/:id", validateToken, postFollow);

export { followRouter };