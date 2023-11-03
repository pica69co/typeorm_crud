import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(postRoutes);

export default app;
