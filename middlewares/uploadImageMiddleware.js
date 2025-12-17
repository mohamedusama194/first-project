import multer from "multer";
import ApiError from "../utils/apiError.js";

// ---------- Multer Memory Storage ----------
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only images allowed", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Upload single image
export const uploadSingleImage = (fieldName) => upload.single(fieldName);

// Upload multiple images
export const uploadMixOfImages = (arrayOfFields) =>
  upload.fields(arrayOfFields);
