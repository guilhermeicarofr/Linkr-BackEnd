import express from "express";

import { validateToken } from "../middlewares/validate.token.js";
import { sharePost } from "../controllers/share.controllers.js";

const shareRouter = express.Router();

shareRouter.post("/share/:postId", validateToken, sharePost);

export { shareRouter };