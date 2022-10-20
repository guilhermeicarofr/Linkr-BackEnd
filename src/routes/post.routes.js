import express from "express";
import { createPost, getTimelinePosts } from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = express.Router();
postRouter.post("/post", validateSchema(postSchema), createPost);
postRouter.get("/timeline", getTimelinePosts);

export { postRouter };
