import categoryModel from "../models/categoryModel.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlersFactory.js";
import ApiError from "../utils/apiError.js";

const multerStorage = multer.multerStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `category - ${uuidv4()} - ${Date.now} -${ext}`;
    cb(null, filename);
  },
});
const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("ONLY image allowed", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadCategoryImage = upload.single("image");
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
