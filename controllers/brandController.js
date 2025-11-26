import brandModel from "../models/brandModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
// get all brand
//@route get /api/v1/brands
export const getAllBrands = getAll(brandModel);

// get spicific brand
//@route get /api/v1/brands/:id
export const getBrand = getOne(brandModel);

// Create brand
//@route POST /api/v1/brands
export const createBrand = createOne(brandModel);

// Update brand
//@route put /api/v1/brands
export const updateBrand = updateOne(brandModel);

// delete brand
//@route delete /api/v1/brands
export const deleteBrand = deleteOne(brandModel);
