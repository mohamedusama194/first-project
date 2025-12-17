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
// create all subcategory
//@route patch /api/v1/subcategories
export const getSubCategories = getAll(subCategoryModel);

// get  subcategory
//@route patch /api/v1/subcategories/:id
export const getSubCategory = getOne(subCategoryModel);

export const setCategoryIdForBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// create subcategory
//@route patch /api/v1/subcategories/
export const createSubCategory = createOne(subCategoryModel);

// Update subcategory
//@route patch /api/v1/subcategories/:id
export const updateSubCategory = updateOne(subCategoryModel);

// delete subcategory
//@route delete /api/v1/subcategories/:id
export const deleteSubCategory = deleteOne(subCategoryModel);
