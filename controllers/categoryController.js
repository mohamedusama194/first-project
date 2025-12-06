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
import ensureFolderExists from "../utils/createFolder.js";
export const uploadCategoryImage = uploadSingleImage("image");

export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer) //image processing for node
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`${ensureFolderExists("uploads/brands")}/${filename}`);
    //save image into db
    req.body.image = filename;
  }
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
