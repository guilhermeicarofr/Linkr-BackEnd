import express from "express";
import { getFollow, postFollow } from "../controllers/follow.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";


const followRouter = express.Router();

followRouter.post("/follow/:id", validateToken, postFollow);
followRouter.get("/following/:id", validateToken, getFollow)

export { followRouter };