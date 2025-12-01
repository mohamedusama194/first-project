import ProductModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import ensureFolderExists from "../utils/createFolder.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import { uploadMixOfIamges } from "../middlewares/uploadImageMiddleware.js";
export const uploadProductImages = uploadMixOfIamges([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);
export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverfilename = `product-${uuidv4()}-${Date.now()}cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer) //image processing for node
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(
        `${ensureFolderExists("uploads/products")}/${imageCoverfilename}`
      );
    //save image into db
    req.body.imageCover = imageCoverfilename;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer) //image processing for node
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toFile(`${ensureFolderExists("uploads/products")}/${imageName}`);
        //save image into db
        req.body.images.push(imageName);
      })
    );
    next();
  }
});

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
//@route patch /api/v1/products/:id
//@access private
export const updateProduct = updateOne(ProductModel);

//@desc delete product
//@route delete /api/v1/products/:id
//@access private
export const deleteProduct = deleteOne(ProductModel);
