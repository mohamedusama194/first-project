import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import slugify from "slugify";
import subCategoryModel from "../models/subCategoryModel.js";

export const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});

export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    // res.status(404).json({ msg: `no category with this id ${id}` });
    return next(new ApiError(`no subCategory with this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

export const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// Update category
//@route put /api/v1/categories
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true } //this syntax to return category after update
  );
  if (!subCategory) {
    return next(new ApiError(`no subCategory with this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// delete category
//@route delete /api/v1/categories
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`no subCategory with this id ${id}`, 404));
  }
  res.status(204).json();
});
