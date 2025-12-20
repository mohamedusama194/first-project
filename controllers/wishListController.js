import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc   Add product to wishlist
// @route  POST /api/v1/wishlist
// @access protected/User
export const addProductToWishList = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added to wishlist",
    data: user.wishlist,
  });
});
// @desc   Remove product from wishlist
// @route  POST /api/v1/wishlist
// @access protected/User
export const removeProductFromWishList = asyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.productId },
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Product removed from wishlist",
      data: user.wishlist,
    });
  }
);
// @desc   get wishlist of logged user
// @route  POST /api/v1/wishlist
// @access protected/User
export const getLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("wishlist");
  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
