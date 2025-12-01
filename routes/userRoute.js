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
} from "../controllers/userController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // user must be login

router.patch("/updateMe", protect, updateMe);
router.patch("/updateMyPassword", protect, updateMyPassword);
router.get("/me", protect, getMe);
router.delete("/deleteMe", protect, deleteMe);

router.use(allowedTo("admin")); // this feature for admins

router.get("/", getAllUsers);
// router.get("/:id", getUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
export default router;
