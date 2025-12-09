import express from "express";
import {
  getReviewValidation,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} from "../utils/validators/reviewValidator.js";
import {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdForBody,
} from "../controllers/reviewController.js";
import { protect, allowedTo } from "../middlewares/authMiddleware.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getAllReviews)
  .post(
    protect,
    allowedTo("user"),
    setProductIdForBody,
    createReviewValidator,
    createReview
  );
router.use(protect);
router
  .route("/:id")
  .get(getReviewValidation, getReview)
  .patch(allowedTo("user"), updateReviewValidator, updateReview)
  .delete(allowedTo("admin", "user"), deleteReviewValidator, deleteReview);
export default router;
