import express from "express";
import morgan from "morgan";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import wordsRoutes from "./routes/words.routes.js";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(express.static(path.join(__dirname, 'public', 'javascripts')))


// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", wordsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
