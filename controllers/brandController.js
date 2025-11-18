import slugify from "slugify";
import brandModel from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";

// get all brand
//@route get /api/v1/brands
export const getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page, data: brands });
});

// get spicific brand
//@route get /api/v1/brands/:id
export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `no brand with this id ${id}` });
    return next(new ApiError(`no brand with this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// Create brand
//@route POST /api/v1/brands
export const createBrand = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// Update brand
//@route put /api/v1/brands
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //this syntax to return brand after update
  );
  if (!brand) {
    return next(new ApiError(`no brand with this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// delete brand
//@route delete /api/v1/brands
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`no brand with this id ${id}`, 404));
  }
  res.status(204).json();
});
