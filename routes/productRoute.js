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
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").post(createProductValidator, createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProductValidation, getProduct)
  .put(updateProductValidation, updateProduct)
  .delete(deleteProductValidation, deleteProduct);

export default router;
