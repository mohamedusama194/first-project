import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import orderModel from "../models/orderModel.js";
import coponModel from "../models/couponModel.js";
import productModel from "../models/productModel.js";

export const createCashOrder = asyncHandler(async (req, res, next) => {
  // 1) Get cart price depend on cartItems
});
