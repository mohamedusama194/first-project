import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import CategoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import SubCategoryRoute from "./routes/subCategoryRoute.js";
import productRoute from "./routes/productRoute.js";
import ApiError from "./utils/apiError.js";
import globalError from "./middlewares/errorMiddleware.js";
dotenv.config({ path: "config.env" });
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
app.use((req, res, next) => {
  const error = new Error("route not exist");
  error.status = 404;
  next(error);
});

// app.all("*", (req, res, next) => {
//   next(new ApiError(`cant find this route ${req.originalUrl}`, 400));
// });
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
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
