import { check, body } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

// export const getBrandValidation = [
//   check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
//   validationMiddleware,
// ];
export const updateUserDataValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name required")
    .isLength({ min: 5 })
    .withMessage("too short user name")
    .isLength({ max: 30 })
    .withMessage("too long user name"),
  check("email")
    .notEmpty()
    .withMessage("Plese enter An email")
    .isEmail()
    .withMessage("Invalid email format"),
  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("mobile phone is wrong"),
  validationMiddleware,
];
export const updateUserPasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  check("password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please confirm your new password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  validationMiddleware,
];
