import subCategoryModel from "../models/subCategoryModel.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
export const getSubCategories = getAll(subCategoryModel);

export const getSubCategory = getOne(subCategoryModel);

export const setCategoryIdForBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
export const createSubCategory = createOne(subCategoryModel);

// Update category
//@route put /api/v1/categories
export const updateSubCategory = updateOne(subCategoryModel);

// delete category
//@route delete /api/v1/categories
export const deleteSubCategory = deleteOne(subCategoryModel);
