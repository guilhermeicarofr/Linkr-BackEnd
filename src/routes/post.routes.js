import express from "express";
import {
	createPost,
	getLikes,
	getTimelinePosts,
} from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { validateToken } from "../middlewares/validate.token.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = express.Router();
postRouter.post("/post", validateSchema(postSchema), validateToken, createPost);
postRouter.get("/timeline", validateToken, getTimelinePosts);
postRouter.get("/likes/:postId",validateToken, getLikes);

export { postRouter };
