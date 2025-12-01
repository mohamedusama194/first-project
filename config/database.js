import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`DataBase Connected : ${conn.connection.host}`);
    // }).catch((err)=>{
    // console.log(` error is ${err}`);
    // process.exit(1);
  });
};
export default dbConnection;
