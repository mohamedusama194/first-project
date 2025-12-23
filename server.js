import "./loadEnv.js";
import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import globalError from "./middlewares/errorMiddleware.js";
import mountRoutes from "./routes/index.js";
//db connection
dbConnection();
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

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on port ${PORT}`);
});
// global error unhandled for promises out of epxress
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down ......`);
    process.exit(1);
  });
});
