import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc   Add address to addresses
// @route  POST /api/v1/addresses
// @access protected/User
export const addAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address added to addresses",
    data: user.addresses,
  });
});
// @desc   Remove address from addresses
// @route  POST /api/v1/addresses
// @access protected/User
export const removeAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address removed from addresses",
    data: user.addresses,
  });
});
// @desc   get address of logged user
// @route  POST /api/v1/addresses
// @access protected/User
export const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("addresses");
  res.status(200).json({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});
