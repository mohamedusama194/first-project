import reviewModel from "../models/reviewModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};
export const setProductIdForBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
//@route get /api/v1/reviews
export const getAllReviews = getAll(reviewModel);
// get spicific review
//@route get /api/v1/reviews/:id
export const getReview = getOne(reviewModel);
// Create review
//@route POST /api/v1/reviews
export const createReview = createOne(reviewModel);
// Update review
//@route put /api/v1/reviews/:id
export const updateReview = updateOne(reviewModel);
// delete review
//@route delete /api/v1/reviews/:id
export const deleteReview = deleteOne(reviewModel);
