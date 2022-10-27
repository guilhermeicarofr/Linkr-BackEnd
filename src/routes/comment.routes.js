import express from "express";

import { createComment, getComments } from "../controllers/comment.controllers.js";
import { validatePost } from "../middlewares/validate.post.js";
import { validateToken } from "../middlewares/validate.token.js";

const commentRouter = express.Router();

commentRouter.get("/comments/:postId", validateToken, validatePost, getComments);
commentRouter.post("/comments/:postId",	validateToken, validatePost, createComment);

export { commentRouter };
