import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const signup = asyncHandler(async (req, res, next) => {
  if (req.body.role) delete req.body.role;
  const { name, email, password, profileImg } = req.body;
  // 1) Check required fields
  if (!name || !email || !password) {
    return next(new ApiError("Please provide name, email and password", 400));
  }
  // 2) Check if email already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return next(new ApiError("Email already registered", 400));
  }
  // 3) Create user
  const user = await UserModel.create({
    name,
    email,
    password,
    profileImg,
  });
  // 5) Send response
  res.status(201).json({
    status: "success signup",
    data: user,
  });
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check email & password exist
  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }

  // 2) Check user exists & select password (select:false)
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  if (!user.active == false) {
    return next(
      new ApiError("This account is deactivated. Please contact support.", 403)
    );
  }

  // 3) Compare passwords
  const isCorrect = await user.correctPassword(password, user.password);

  if (!isCorrect) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  // 4) Generate token
  const token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1- Get user by email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("No user found with this email", 404));
  }

  // 2- Generate reset code (6 digits)
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  // 3- Hash code and save to DB
  user.passwordResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordResetVerified = false;
  await user.save();

  // 4- Send the reset code to user email
  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Code (valid for 10 minutes)",
      message: ` Hi, ${user.name} \n Your password reset code is: ${resetCode}`,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(
      new ApiError(
        "There was an error sending the email. Try again later.",
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: "Reset code sent to email",
  });
});
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetCode: hashedCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid or expired reset code", 400));
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Code verified successfully",
  });
});
export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new ApiError("there is no user for this email ", 400));
  }
  if (user.passwordResetVerified !== true) {
    return next(new ApiError("reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    status: "success resert password",
    token,
  });
});
