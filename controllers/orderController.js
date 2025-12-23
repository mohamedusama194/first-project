import stripe from "../utils/stripe.js";
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
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});
// @desc Create cash order
// @route POST /api/v1/orders/:cartId
// @access Private/User
export const createCashOrder = asyncHandler(async (req, res, next) => {
  // 1) Get cart price depend on cartItems
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(new ApiError("There is no cart for this user", 404));
  }
  const cartPrice = cart.totalCartPriceAfterDiscount
    ? cart.totalCartPriceAfterDiscount
    : cart.totalCartPrice;

  const shippingPrice = 20; // Example fixed shipping price
  const taxPrice = 0; // Example 15% tax
  const totalPrice = cartPrice + shippingPrice + taxPrice;

  // 2) Create order with default payment method cash
  const order = await orderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalPrice,
  });
  // 3) After creating order, decrement product quantity, increment sold
  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { quantity: -item.quantity, sold: +item.quantity },
        },
      },
    }));
    await productModel.bulkWrite(bulkOptions, {});

    await cartModel.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});
// @desc get all order
// @route get /api/v1/orders/
// @access PrivateFor all roles
export const getAllOrders = getAll(orderModel);
// @desc get specific order
// @route get /api/v1/orders/:id
// @access private/user
export const getOrder = getOne(orderModel);
// @desc update order to paid
// @route put /api/v1/orders/:id/pay
// @access private/admin
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: true,
      paidAt: Date.now(),
    },
    { new: true }
  );
  if (!order) {
    return next(new ApiError("No order found for this id", 404));
  }
  res.status(200).json({ status: "success", data: order });
});
// @desc update order to delivered
// @route put /api/v1/orders/:id/deliver
// @access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    {
      isDelivered: true,
      deliveredAt: Date.now(),
    },
    { new: true }
  );
  if (!order) {
    return next(new ApiError("No order found for this id", 404));
  }
  res.status(200).json({ status: "success", data: order });
});

export const checkoutSession = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOne({
    _id: req.params.cartId,
    user: req.user._id,
  });

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  const totalPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: req.user.email,
    client_reference_id: cart._id.toString(),

    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: `Order for ${req.user.name}`,
          },
          unit_amount: Math.round(totalPrice * 100),
        },
        quantity: 1,
      },
    ],

    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
  });

  res.status(200).json({
    status: "success",
    session,
  });
});
