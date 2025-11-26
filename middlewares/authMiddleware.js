import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import UserModel from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  // 1) Check token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check user exists
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User no longer exists", 401));
  }

  // Attach user to req
  req.user = user;
  next();
});
