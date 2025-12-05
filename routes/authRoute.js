import express from "express";
import { signup, login } from "../controllers/authController.js";
import {
  signupValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";
import { uploadUserImage } from "../middlewares/uploadImageMiddleware.js";
import { resizeImage } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", uploadUserImage, resizeImage, signupValidator, signup);
router.post("/login", loginValidator, login);

export default router;
