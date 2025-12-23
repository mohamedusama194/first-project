import express from "express";
import {
  createCashOrder,
  filterOrderForLoggedUser,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} from "../controllers/orderController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect);
router
  .route("/checkout-session/:cartId")
  .post(allowedTo("user"), checkoutSession);
router
  .route("/")
  .get(allowedTo("user", "admin"), filterOrderForLoggedUser, getAllOrders);
router.route("/:id").get(filterOrderForLoggedUser, getOrder);
router.route("/:cartId").post(createCashOrder);
router.route("/:id/pay").patch(allowedTo("admin"), updateOrderToPaid);
router.route("/:id/deliver").patch(allowedTo("admin"), updateOrderToDelivered);
export default router;
