import categoryModel from "../models/categoryModel.js";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import sharp from "sharp";
import imagekit from "../utils/imageKit.js";

export const uploadCategoryImage = uploadSingleImage("image");

export const resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const processed = await sharp(req.file.buffer)
    .resize(600, 600)
    .jpeg({ quality: 80 })
    .toBuffer();
  const uploaded = await imagekit.upload({
    file: processed.toString("base64"),
    fileName: `category-${uuidv4()}.jpeg`,
    folder: "/categories",
  });
  req.body.image = uploaded.url;
  next();
});

// get all category
//@route get /api/v1/categories
export const getCategories = getAll(categoryModel);
// get spicific category
//@route get /api/v1/categories/:id
export const getCategory = getOne(categoryModel);

// Create category
//@route POST /api/v1/categories
export const createCategory = createOne(categoryModel);

// Update category
//@route patch /api/v1/categories/:id
export const updateCategory = updateOne(categoryModel);

// delete category
//@route delete /api/v1/categories/:id
export const deleteCategory = deleteOne(categoryModel);
