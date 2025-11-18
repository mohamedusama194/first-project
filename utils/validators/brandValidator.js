import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

export const getBrandValidation = [
  check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
  validationMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ min: 3 })
    .withMessage("too short cartegory name")
    .isLength({ max: 30 })
    .withMessage("too long cartegory name"),
  validationMiddleware,
];
export const updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
  validationMiddleware,
];
export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
  validationMiddleware,
];
