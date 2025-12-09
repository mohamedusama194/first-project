import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import imagekit from "../utils/imageKit.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";
export const uploadUserImage = uploadSingleImage("profileImg");
export const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const processed = await sharp(req.file.buffer)
    .resize(600, 600)
    .jpeg({ quality: 80 })
    .toBuffer();
  const uploaded = await imagekit.upload({
    file: processed.toString("base64"),
    fileName: `user-${uuidv4()}.jpeg`,
    folder: "/users",
  });
  req.body.profileImg = uploaded.url;
  next();
});
// @desc   Get all users (Admin)
// @route  GET /api/v1/users
// @access Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find().select("-password"); // Hidden password
  res.status(200).json({
    results: users.length,
    data: users,
  });
});

// @desc   Get user by id (Admin)
// @route  GET /api/v1/users/:id
// @access Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id).select("-password");

  if (!user) {
    return next(new ApiError(`No user found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    data: user,
  });
});

// @desc   Get logged-in user's data
// @route  GET /api/v1/users/me
// @access User
export const getLoggedUserData = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("-password");

  res.status(200).json({
    status: "success",
    data: user,
  });
});
// @desc   Update user (Admin)
// @route  PATCH /api/v1/users/:id
// @access Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return next(new ApiError(`No user found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

// @desc   Deactivate user (Admin)
// @route  DELETE /api/v1/users/:id
// @desc   Update logged-in user data (NOT password)
// @route  PATCH /api/v1/users/updateMe
// @access User
export const updateLoggedUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, profileImg } = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name, email, phone, profileImg },
    { new: true }
  ).select("-password");

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});
// @desc   Update logged-in user password
// @route  PATCH /api/v1/users/updateMyPassword
// @access User

export const updateLoggedUsePassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("+password");

  const isCorrect = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!isCorrect) {
    return next(new ApiError("old password is wrong!", 400));
  }

  // replace the new password and save it in db
  user.password = req.body.password;
  user.passwordChangedAt = Date.now();
  await user.save();

  //generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    token,
  });
});
// @desc   Deactivate logged-in user
// @route  DELETE /api/v1/users/deleteMe
// @access Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(`No user found with ID ${req.params.id}`, 404));
  }

  res.status(204).json();
});
// @desc   Deactivate logged-in user
// @route  DELETE /api/v1/users/deleteMe
// @access User
export const deleteLoggedUser = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json();
});
