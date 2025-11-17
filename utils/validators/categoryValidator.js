import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

export const getCategoryValidation = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  validationMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 3 })
    .withMessage("too short cartegory name")
    .isLength({ max: 30 })
    .withMessage("too long cartegory name"),
  validationMiddleware,
];
export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  validationMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  validationMiddleware,
];
