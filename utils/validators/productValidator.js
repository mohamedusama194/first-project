import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";
import Category from "../../models/categoryModel.js";

export const getProductValidation = [
  check("id").isMongoId().withMessage("invalid product id ya ray2"),
  validationMiddleware,
];
export const createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 letters ")
    .notEmpty()
    .withMessage("u must enter title for this product"),
  check("description")
    .notEmpty()
    .withMessage("product description is requried")
    .isLength({ min: 10 })
    .withMessage("too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is requried")
    .isNumeric()
    .withMessage("quantity must be a number"),
  check("sold").optional().isNumeric().withMessage("sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("u must enter price for this product")
    .isNumeric(" the price must be a number")
    .withMessage("quantity must be a number")
    .isLength({ max: 7 })
    .withMessage("too long price"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("product priceAfterDiscount bust be a number")
    .custom((value, { req }) => {
      if (req.body.price < value) {
        throw new Error("priceAfterDiscount must be lower than original price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be array of string"),
  check("imageCover").notEmpty().withMessage("u must entered an imageCover"),
  check("images")
    .optional()
    .isArray()
    .withMessage("image should be array of string"),
  check("category")
    .isMongoId()
    .withMessage("invalid ID format")
    .notEmpty()
    .withMessage("product must be belong for an category")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(`no category for this id ${categoryId}`);
        }
      })
    ),
  check("subcategory").optional().isMongoId().withMessage("invalid ID format"),
  check("brand").optional().isMongoId().withMessage("invalid ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("quantity must be a number")
    .isLength({ min: 1 })
    .withMessage("rating must be above or equal one")
    .isLength({ max: 5 })
    .withMessage("rating must be below or equal five"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  ,
  validationMiddleware,
];

export const updateProductValidation = [
  check("id").isMongoId().withMessage("invalid product id ya ray2"),
  validationMiddleware,
];

export const deleteProductValidation = [
  check("id").isMongoId().withMessage("invalid product id ya ray2"),
  validationMiddleware,
];
