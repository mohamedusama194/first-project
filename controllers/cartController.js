import asyncHandler from "express-async-handler";
import cartModel from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";
import ApiError from "../utils/apiError.js";
import CoponModel from "../models/coponModel.js";

export const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await ProductModel.findById(productId);
  let cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    cart = await cartModel.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity += 1;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }
  await cart.save();
  res.status(200).json({ status: "success", data: cart });
});
export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );
  cart.totalCartPrice = calculateTotalPrice(cart.cartItems);
  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Product removed from cart",
    data: cart,
  });
});
export const getUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
export const clearUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndDelete({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  res.status(204).json({ status: "success", data: null });
});
export const getSpecificCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel
    .findById(req.params.id)
    .populate("cartItems.product");
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  res.status(200).json({ status: "success", data: cart });
});
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Cart item quantity updated",
      data: cart,
    });
  } else {
    return next(new ApiError("No cart item found with this ID", 404));
  }
});
export const applyCouponToCart = asyncHandler(async (req, res, next) => {
  const { couponCode } = req.body;

  const coupon = await CoponModel.findOne({
    code: couponCode,
    expireDate: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("Invalid or expired coupon code", 400));
  }

  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  // 🔑 اربط الكوبون بالكارت
  cart.coupon = coupon._id;
  cart.discount = coupon.discount; // نسبة الخصم %

  await cart.save(); // ← middleware هيحسب كل حاجة

  res.status(200).json({
    status: "success",
    data: {
      cartItems: cart.cartItems,
      totalCartPrice: cart.totalCartPrice,
      totalCartPriceAfterDiscount: cart.totalCartPriceAfterDiscount,
    },
  });
});
