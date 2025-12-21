import CoponModel from "../models/coponModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
// @desc    Create copon
// @route   POST /api/v1/copons
// @access  Private/Admin
export const createCopon = createOne(CoponModel);
// @desc    Get all copons
// @route   GET /api/v1/copons
// @access  Public
export const getAllCopons = getAll(CoponModel);
// @desc    Get specific copon
// @route   GET /api/v1/copons/:id
// @access  Public
export const getCopon = getOne(CoponModel);
// @desc    Update copon
// @route   PUT /api/v1/copons/:id
// @access  Private/Admin
export const updateCopon = updateOne(CoponModel);
// @desc    Delete copon
// @route   DELETE /api/v1/copons/:id
// @access  Private/Admin
export const deleteCopon = deleteOne(CoponModel);
