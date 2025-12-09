import express from "express";
import {
  getAllUsers,
  getUser,
  updateLoggedUsePassword,
  updateLoggedUser,
  updateUser,
  deleteUser,
  getLoggedUserData,
  deleteLoggedUser,
  resizeImage,
} from "../controllers/userController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
import {
  updateUserPasswordValidator,
  updateUserDataValidator,
} from "../utils/validators/uservalidator.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";
const router = express.Router();

router.use(protect); // user must be login

router.patch(
  "/updateMe",
  uploadSingleImage,
  resizeImage,
  updateUserDataValidator,
  updateLoggedUser
);
router.patch(
  "/updateMyPassword",
  updateUserPasswordValidator,
  updateLoggedUsePassword
);
router.get("/me", getLoggedUserData);
router.delete("/deleteMe", deleteLoggedUser);

router.use(allowedTo("admin")); // this feature for admins

router.get("/Data", getAllUsers);
router
  .route("/deleteUser/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
export default router;
