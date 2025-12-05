import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

// export const getBrandValidation = [
//   check("id").isMongoId().withMessage("invalid Brand id ya ray2"),
//   validationMiddleware,
// ];

export const signupValidator = [
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
  check("password")
    .notEmpty()
    .withMessage("you must entered password")
    .isLength({ min: 6 })
    .withMessage("password too short ")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("passwordConfirm IS incorrect");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("password Confirm is incorrect "),
  validationMiddleware,
];
export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Plese enter An email")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password").notEmpty().withMessage("you must entered password"),
  validationMiddleware,
];
