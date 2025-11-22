import slugify from "slugify";
import ProductModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

//@desc get all products
//@route get /api/v1/products
//@access public

export const getProducts = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .filter()
    .limitFields()
    .keywordSearch()
    .sort()
    .paginate();

  const product = await apiFeatures.mongooseQuery;

  res.status(200).json({ result: product.length, data: product });
});

//@desc get all products
//@route get /api/v1/products /:id
//@access public
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(`no product with this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc createProduct
//@route POST /api/v1/products
//@access private
export const createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

//@desc updateProduct
//@route put /api/v1/products/:id
//@access private
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true } //this syntax to return product after update
  );
  if (!product) {
    return next(new ApiError(`no product with this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc delete product
//@route delete /api/v1/products/:id
//@access private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`no product with this id ${id}`, 404));
  }
  res.status(204).json();
});
