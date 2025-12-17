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
router.use(protect);
router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(
    allowedTo("admin"),
    setCategoryIdForBody,
    createSubCategoryValidator,
    createSubCategory
  );
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(allowedTo("admin"), updateSubCategoryValidator, updateSubCategory)
  .delete(allowedTo("admin"), deleteSubCategoryValidator, deleteSubCategory);

export default router;
