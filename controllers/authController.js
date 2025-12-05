import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import generateToken from "../utils/generateToken.js";
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
  // 4) Generate token
  const token = generateToken(user._id);
  // 5) Send response
  res.status(201).json({
    status: "success signup",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
        role: user.role,
      },
    },
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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});
