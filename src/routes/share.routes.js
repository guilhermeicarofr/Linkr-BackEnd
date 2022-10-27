import express from "express";

import { validateToken } from "../middlewares/validate.token.js";
import { getShareCount, sharePost } from "../controllers/share.controllers.js";
import { validatePost } from "../middlewares/validate.post.js";

const shareRouter = express.Router();

shareRouter.post("/shares/:postId", validateToken, validatePost, sharePost);
shareRouter.get("/shares/:postId", validateToken, validatePost, getShareCount);

export { shareRouter };