import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id ya ray2a"),
  validationMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name required")
    .isLength({ min: 3 })
    .withMessage("too short cartegory name")
    .isLength({ max: 30 })
    .withMessage("too long cartegory name"),
  check("category")
    .notEmpty()
    .withMessage("the subcategory must be belong for category ")
    .isMongoId()
    .withMessage('"invalid subCategory id ya ray2"'),
  validationMiddleware,
];
export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subCategory id ya ray2"),
  validationMiddleware,
];
export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subCategory id ya ray2"),
  validationMiddleware,
];
