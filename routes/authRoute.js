import express from "express";
import { signup, login } from "../controllers/authController.js";
import { signupValidator } from "../utils/validators/authValidator.js";
const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", login);

export default router;
