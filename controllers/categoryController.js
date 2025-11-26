import categoryModel from "../models/categoryModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
// get all category
//@route get /api/v1/categories
export const getCategories = getAll(categoryModel);
// get spicific category
//@route get /api/v1/categories/:id
export const getCategory = getOne(categoryModel);

// Create category
//@route POST /api/v1/categories
export const createCategory = createOne(categoryModel);

// Update category
//@route put /api/v1/categories
export const updateCategory = updateOne(categoryModel);

// delete category
//@route delete /api/v1/categories
export const deleteCategory = deleteOne(categoryModel);
