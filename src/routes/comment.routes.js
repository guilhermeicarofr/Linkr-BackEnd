import express from "express";

import { createComment, getComments } from "../controllers/comment.controllers";
import { validatePost } from "../middlewares/validate.post";
import { validateToken } from "../middlewares/validate.token";

const commentRouter = express.Router();

commentRouter.get("/comments/:postId", validateToken, validatePost, getComments);
commentRouter.post("/comments/:postId",	validateToken, validatePost, createComment);

export { commentRouter };
