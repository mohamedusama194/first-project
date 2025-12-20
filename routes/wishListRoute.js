import express from "express";
import {
  addProductToWishList,
  removeProductFromWishList,
  getLoggedUserWishList,
} from "../controllers/wishListController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect); // user must be logged in
router.get("/", allowedTo("user"), getLoggedUserWishList);
router.post("/", allowedTo("user"), addProductToWishList);
router.delete("/:productId", allowedTo("user"), removeProductFromWishList);
export default router;
