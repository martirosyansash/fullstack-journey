import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes.js";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;