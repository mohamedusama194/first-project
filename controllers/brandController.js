import brandModel from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import imagekit from "../utils/imageKit.js";
// image the name of field in model
export const uploadBrandImage = uploadSingleImage("image");
export const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const processed = await sharp(req.file.buffer)
    .resize(600, 600)
    .jpeg({ quality: 80 })
    .toBuffer();

  const uploaded = await imagekit.upload({
    file: processed.toString("base64"),
    fileName: `brand-${uuidv4()}.jpeg`,
    folder: "/brands",
  });

  req.body.image = uploaded.url;
  next();
});
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
//@route put /api/v1/brands/:id
export const updateBrand = updateOne(brandModel);
// delete brand
//@route delete /api/v1/brands/:id
export const deleteBrand = deleteOne(brandModel);
