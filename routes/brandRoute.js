import express from "express";
import {
  getBrandValidation,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator.js";
import {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} from "../controllers/brandController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getAllBrands)
  .post(
    protect,
    allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(protect, getBrandValidation, getBrand)
  .patch(protect, allowedTo("admin"), updateBrandValidator, updateBrand)
  .delete(protect, allowedTo("admin"), deleteBrandValidator, deleteBrand);
export default router;
