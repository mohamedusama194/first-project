import { check, body } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";
import slugify from "slugify";

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
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validationMiddleware,
];
export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validationMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  validationMiddleware,
];
