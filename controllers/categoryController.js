import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// get all category
//@route get /api/v1/categories
export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});

// get spicific category
//@route get /api/v1/categories/:id
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `no category with this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// Create category
//@route POST /api/v1/categories
export const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// Update category
//@route put /api/v1/categories
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //this syntax to return category after update
  );
  if (!category) {
    res.status(404).json({ msg: `no category with this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// delete category
//@route put /api/v1/categories
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `no category with this id ${id}` });
  }
  res.status(204).json();
});
