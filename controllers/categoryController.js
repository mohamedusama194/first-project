import categoryModel from "../models/categoryModel.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import ApiError from "../utils/apiError.js";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("ONLY image allowed", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadCategoryImage = upload.single("image");
export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category - ${uuidv4()} - ${Date.now()}.jpeg`;
  await sharp(req.file.buffer) //image processing for node
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(`uploads/categories/${filename}`);
  //save image into db
  req.body.image = filename;
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
//@route put /api/v1/categories
export const updateCategory = updateOne(categoryModel);

// delete category
//@route delete /api/v1/categories
export const deleteCategory = deleteOne(categoryModel);
