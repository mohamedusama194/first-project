import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import globalError from "./middlewares/errorMiddleware.js";
import mountRoutes from "./routes/index.js";
const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Mount router
mountRoutes(app);
app.use((req, res, next) => {
  const error = new Error("route not exist");
  error.status = 404;
  next(error);
});
app.use(globalError);
export default app;
