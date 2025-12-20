import express from "express";
import {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} from "../controllers/adressesController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect); // user must be logged in
router.get("/", allowedTo("user"), getLoggedUserAddresses);
router.post("/", allowedTo("user"), addAddress);
router.delete("/:addressId", allowedTo("user"), removeAddress);
export default router;
