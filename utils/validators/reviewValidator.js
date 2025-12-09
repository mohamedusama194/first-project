import { check, body } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";
import reviewModel from "../../models/reviewModel.js";
export const getReviewValidation = [
  check("id").isMongoId().withMessage("invalid Review id ya ray2"),
  validationMiddleware,
];

export const createReviewValidator = [
  check("title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("too long review title"),
  check("rating")
    .notEmpty()
    .withMessage("review rating required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5"),
  check("user").isMongoId().withMessage("invalid user id ya ray2"),
  check("product")
    .isMongoId()
    .withMessage("invalid product id ya ray2")
    .custom((val, { req }) => {
      return reviewModel
        .findOne({ user: req.user._id, product: req.body.product })
        .then((review) => {
          if (review) {
            return Promise.reject(
              new Error("you already created a review for this product")
            );
          }
        });
    }),
  validationMiddleware,
];
export const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid review id ya ray2")
    .custom((val, { req }) => {
      return reviewModel.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error("review not found"));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("you are not allowed to update this review")
          );
        }
      });
    }),
  validationMiddleware,
];
export const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid review id ya ray2")
    .custom((val, { req }) => {
      if (req.user.role === "user") {
        return reviewModel.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(new Error("review not found"));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("you are not allowed to delete this review")
            );
          }
        });
      }
    }),
  validationMiddleware,
];
