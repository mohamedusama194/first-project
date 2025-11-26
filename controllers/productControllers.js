import ProductModel from "../models/productModel.js";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";

//@desc get all products
//@route get /api/v1/products
//@access public

export const getProducts = getAll(ProductModel);

//@desc get all products
//@route get /api/v1/products /:id
//@access public
export const getProduct = getOne(ProductModel);

//@desc createProduct
//@route POST /api/v1/products
//@access private
export const createProduct = createOne(ProductModel);
//@desc updateProduct
//@route put /api/v1/products/:id
//@access private
export const updateProduct = updateOne(ProductModel);

//@desc delete product
//@route delete /api/v1/products/:id
//@access private
export const deleteProduct = deleteOne(ProductModel);
