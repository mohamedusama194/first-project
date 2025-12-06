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
  if (req.file) {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, uploadResult) => {
        if (error) return next(new ApiError("Image upload failed", 500));

        req.body.image = uploadResult.secure_url;
        next();
      }
    );

    sharp(req.file.buffer).toFormat("jpeg").pipe(result);
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
