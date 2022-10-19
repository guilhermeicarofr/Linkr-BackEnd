import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(userRouter);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
