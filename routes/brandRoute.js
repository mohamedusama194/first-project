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
router.use(protect);
router
  .route("/")
  .get(getAllBrands)
  .post(
    allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidation, getBrand)
  .patch(allowedTo("admin"), updateBrandValidator, updateBrand)
  .delete(allowedTo("admin"), deleteBrandValidator, deleteBrand);
export default router;
