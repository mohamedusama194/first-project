import express from "express";
import {
  getAllCopons,
  createCopon,
  getCopon,
  updateCopon,
  deleteCopon,
} from "../controllers/coponController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.use(protect, allowedTo("admin"));
router.route("/").get(getAllCopons).post(createCopon);
router.route("/:id").get(getCopon).patch(updateCopon).delete(deleteCopon);
export default router;
