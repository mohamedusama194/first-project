import { check } from "express-validator";
import validationMiddleware from "../../middlewares/validatiorMiddleware.js";

export const getCategoryValidation = [
  check("id").isMongoId().withMessage("invalid category id ya ray2"),
  validationMiddleware,
];
