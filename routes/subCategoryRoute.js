import express from "express";
import {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";
import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  setCategoryIdForBody,
  createFilterObj,
} from "../controllers/subCategoryController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, createFilterObj, getSubCategories)
  .post(
    protect,
    allowedTo("admin"),
    setCategoryIdForBody,
    createSubCategoryValidator,
    createSubCategory
  );

router
  .route("/:id")
  .get(protect, getSubCategoryValidator, getSubCategory)
  .patch(
    protect,
    allowedTo("admin"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

export default router;
