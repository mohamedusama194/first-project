import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

export default generateToken;
