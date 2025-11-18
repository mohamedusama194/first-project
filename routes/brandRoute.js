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
} from "../controllers/brandController.js";
import subCategoryRoute from "./brandRoute.js";
const router = express.Router();

// router.use("/:categoryId/subCategories", subCategoryRoute);

router.route("/").get(getAllBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidation, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
export default router;
