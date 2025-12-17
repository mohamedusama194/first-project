import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../controllers/authController.js";
import {
  signupValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";

import { uploadUserImage, resizeImage } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", uploadUserImage, resizeImage, signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.post("/resetPassword", resetPassword);

export default router;
