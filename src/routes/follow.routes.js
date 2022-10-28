import express from "express";
import { getFollow, getProfilesUserFollows, postFollow } from "../controllers/follow.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";


const followRouter = express.Router();

followRouter.post("/follow/:id", validateToken, postFollow);
followRouter.get("/following/:id", validateToken, getFollow);
followRouter.get("/following", validateToken, getProfilesUserFollows);

export { followRouter };