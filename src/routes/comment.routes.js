import express from "express";

import { createComment, getComments, getCountComments } from "../controllers/comment.controllers.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { validatePost } from "../middlewares/validate.post.js";
import { validateToken } from "../middlewares/validate.token.js";
import { commentSchema } from "../schemas/comment.schema.js";

const commentRouter = express.Router();

commentRouter.get("/comments/:postId", validateToken, validatePost, getComments);
commentRouter.post("/comments/:postId",	validateToken, validatePost,validateSchema(commentSchema), createComment);
commentRouter.get("/comments/count/:postId", validateToken, validatePost, getCountComments);

export { commentRouter };
