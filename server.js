import "./loadEnv.js";
import app from "./app.js";
import dbConnection from "./config/database.js";
//db connection
dbConnection();

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
