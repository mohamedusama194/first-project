import express from "express";
import {
  createProductValidator,
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
} from "../utils/validators/productValidator.js";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  uploadProductImages,
  resizeProductImages,
} from "../controllers/productControllers.js";
import reviewRouter from "./reviewRoute.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use("/:productId/reviews", reviewRouter);
router.use(protect);
router
  .route("/")
  .post(
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProductValidation, getProduct)
  .patch(
    allowedTo("admin"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidation,
    updateProduct
  )
  .delete(allowedTo("admin"), deleteProductValidation, deleteProduct);

export default router;
