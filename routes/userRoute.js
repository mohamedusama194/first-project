import express from "express";
import {
  getAllUsers,
  getUser,
  updateMyPassword,
  updateMe,
  updateUser,
  deleteUser,
  getMe,
  deleteMe,
  resizeImage,
} from "../controllers/userController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
import {
  updateUserPasswordValidator,
  updateUserDataValidator,
} from "../utils/validators/uservalidator.js";
import { uploadUserImage } from "../middlewares/uploadImageMiddleware.js";
const router = express.Router();

router.use(protect); // user must be login

router.patch(
  "/updateMe",
  protect,
  uploadUserImage,
  resizeImage,
  updateUserDataValidator,
  updateMe
);
router.patch(
  "/updateMyPassword",
  protect,
  updateUserPasswordValidator,
  updateMyPassword
);
router.get("/me", protect, getMe);
router.delete("/deleteMe", protect, deleteMe);

router.use(allowedTo("admin")); // this feature for admins

router.get("/", getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
export default router;
