import express from "express";
import { getCategoryValidation } from "../utils/validators/categoryValidator.js";
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryValidation, getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
export default router;
