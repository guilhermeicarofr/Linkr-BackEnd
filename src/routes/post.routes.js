import express from "express";
import {
	changeLikes,
	createPost,
	deleteUserPost,
  editPosts,
	getLikes,
	getTimelinePosts,
} from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { validatePost } from "../middlewares/validate.post.js";
import { validateToken } from "../middlewares/validate.token.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = express.Router();
postRouter.post("/post", validateSchema(postSchema), validateToken, createPost);
postRouter.get("/timeline", validateToken, getTimelinePosts);
postRouter.get("/likes/:postId", validateToken, getLikes);
postRouter.post("/likes/:postId", validateToken, validatePost, changeLikes);
postRouter.put("/post/update/:postId", validateToken, validatePost, editPosts);
postRouter.delete("/post/:postId", validateToken, validatePost, deleteUserPost);

export { postRouter };
