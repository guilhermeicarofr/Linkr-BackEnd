import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { hashtagsRouter } from "./routes/hashtags.routes.js";
import { commentRouter } from "./routes/comment.routes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(userRouter);
server.use(postRouter);
server.use(hashtagsRouter);
server.use(commentRouter);

server.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
