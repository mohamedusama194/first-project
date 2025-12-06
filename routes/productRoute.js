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
router.use(protect);
router
  .route("/")
  .post(
    allowedTo("admin"),
    uploadProductImages,
    resizeImage,
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
    resizeImage,
    updateProductValidation,
    updateProduct
  )
  .delete(allowedTo("admin"), deleteProductValidation, deleteProduct);

export default router;
