import express from "express";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getCategoryValidation,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator.js";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
} from "../controllers/categoryController.js";

import subCategoryRoute from "./subCategoryRoute.js";
const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(uploadCategoryImage, protect, createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidation, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
export default router;
