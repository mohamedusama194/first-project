import express from "express";
import {
  addProductToCart,
  getUserCart,
  clearUserCart,
  getSpecificCart,
  removeProductFromCart,
  updateCartItemQuantity,
  applyCouponToCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.post("/add", addProductToCart);
router.get("/", getUserCart);
router.get("/:id", getSpecificCart);
router.patch("/quantity/:itemId", updateCartItemQuantity);
router.patch("/applyCoupon", applyCouponToCart);
router.delete("/clear", clearUserCart);
router.delete("/remove/:itemId", removeProductFromCart);

export default router;
