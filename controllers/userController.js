import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

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

// @desc   Update user (Admin)
// @route  PATCH /api/v1/users/:id
// @access Admin
// @desc   Get logged-in user's data
// @route  GET /api/v1/users/me
// @access User
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("-password");

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
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
export const updateMe = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name, email },
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

export const updateMyPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // 1) هات اليوزر بالكامل + الباسورد
  const user = await UserModel.findById(req.user._id).select("+password");

  // 2) قارن الباسورد القديم
  const isCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isCorrect) {
    return next(new ApiError("Current password is wrong!", 400));
  }

  // 3) حدّث الباسورد بالجديد (هيتعمله hash من الـ pre-save)
  user.password = newPassword;
  await user.save();

  // 4) رجّع token جديد
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    token,
  });
});

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
export const deleteMe = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json();
});
