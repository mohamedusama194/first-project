import ProductModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import imagekit from "../utils/imageKit.js";
import { uploadMixOfImages } from "../middlewares/uploadImageMiddleware.js";
export const uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();

  // process cover
  if (req.files.imageCover && req.files.imageCover.length > 0) {
    const buffer = req.files.imageCover[0].buffer;
    const processedCover = await sharp(buffer)
      .resize(2000, 1333)
      .jpeg({ quality: 80 })
      .toBuffer();

    const uploadedCover = await imagekit.upload({
      file: processedCover.toString("base64"),
      fileName: `product-cover-${uuidv4()}.jpeg`,
      folder: "/products",
    });

    req.body.imageCover = uploadedCover.url;
  }

  // process gallery images
  if (req.files.images && req.files.images.length > 0) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (img, index) => {
        const processedImg = await sharp(img.buffer)
          .resize(600, 600)
          .jpeg({ quality: 80 })
          .toBuffer();

        const uploaded = await imagekit.upload({
          file: processedImg.toString("base64"),
          fileName: `product-${uuidv4()}-${index + 1}.jpeg`,
          folder: "/products",
        });

        req.body.images.push(uploaded.url);
      })
    );
  }

  next();
});

//@desc get all products
//@route get /api/v1/products
//@access public

export const getProducts = getAll(ProductModel);

//@desc get all products
//@route get /api/v1/products /:id
//@access public
export const getProduct = getOne(ProductModel, "reviews");

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
