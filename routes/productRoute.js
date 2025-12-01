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
  resizeImage,
} from "../controllers/productControllers.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeImage,
    createProductValidator,
    createProduct
  )
  .get(protect, getProducts);
router
  .route("/:id")
  .get(protect, getProductValidation, getProduct)
  .patch(
    protect,
    allowedTo("admin"),
    uploadProductImages,
    resizeImage,
    updateProductValidation,
    updateProduct
  )
  .delete(protect, allowedTo("admin"), deleteProductValidation, deleteProduct);

export default router;
