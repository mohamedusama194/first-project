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

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(setCategoryIdForBody, createSubCategoryValidator, createSubCategory);
// router.route("/id").get().put().delete();
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default router;
