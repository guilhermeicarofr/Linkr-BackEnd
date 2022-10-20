import express from "express";
import { hashtagGetController } from "../controllers/hashtags.controllers.js";

const hashtagsRouter = express.Router();

hashtagsRouter.get("/hashtag", hashtagGetController);

export { hashtagsRouter };
