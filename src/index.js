import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(process.env.PORT,  () => console.log(`listening on port ${process.env.PORT}...`))
