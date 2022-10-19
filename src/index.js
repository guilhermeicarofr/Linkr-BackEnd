import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { authRoutes } from "./routes/auth.routes.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
