import "./loadEnv.js";
import express from "express";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import CategoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import SubCategoryRoute from "./routes/subCategoryRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import globalError from "./middlewares/errorMiddleware.js";

//db connection
dbConnection();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Mount router
app.use("/api/v1/categories", CategoryRoute);
app.use("/api/v1/subcategories", SubCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoute);
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
