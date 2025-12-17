import express from "express";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
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
  resizeImage,
} from "../controllers/categoryController.js";

import subCategoryRoute from "./subCategoryRoute.js";
const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRoute);
router.use(protect);
router
  .route("/")
  .get(getCategories)
  .post(
    allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidation, getCategory)
  .patch(
    allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(allowedTo("admin"), deleteCategoryValidator, deleteCategory);
export default router;
