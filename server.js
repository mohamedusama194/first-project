import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import CategoryRoute from "./routes/categoryRoute.js";
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

app.use((err, req, res, next) => {
  //here case if the end point return err acces this err if not
  //global err handling middleware
  res.status(400).json({ err });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
