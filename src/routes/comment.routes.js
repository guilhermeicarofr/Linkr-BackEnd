import express from "express";

import { getComments } from "../controllers/comment.controllers";
import { validatePost } from "../middlewares/validate.post";
import { validateToken } from "../middlewares/validate.token";

const commentRouter = express.Router();

commentRouter.get(
	"/comments/:postId",
	validateToken,
	validatePost,
	getComments
);

export { commentRouter };
