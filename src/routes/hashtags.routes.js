import express from "express";

import { getHashtags, getHashtagsByName } from "../controllers/hashtags.controllers.js";
import { validateToken } from "../middlewares/validate.token.js";

const hashtagsRouter = express.Router();

hashtagsRouter.get("/hashtag",validateToken, getHashtags);
hashtagsRouter.get("/hashtag/:hashtag",validateToken, getHashtagsByName);

export { hashtagsRouter };
