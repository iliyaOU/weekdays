import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import types from "./types/express";
import authRoutes from "./routes/auth";
import scheduleRoutes from "./routes/schedule";
import accessRoutes from "./routes/access";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/access", accessRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
