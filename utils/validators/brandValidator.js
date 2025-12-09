import { check, body } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";
import slugify from "slugify";
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
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validationMiddleware,
];
export const updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validationMiddleware,
];
export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
  validationMiddleware,
];
