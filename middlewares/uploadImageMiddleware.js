import multer from "multer";
import ApiError from "../utils/apiError.js";

const multerOption = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("ONLY image allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

export const uploadSingleImage = (FieldName) =>
  multerOption().single(FieldName);

export const uploadMixOfIamges = (arrayOfFeilds) =>
  multerOption().fields(arrayOfFeilds);

export const uploadUserImage = uploadSingleImage("profileImg");
