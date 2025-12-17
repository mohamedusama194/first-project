import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name Requried"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short Category name"],
      maxlength: [30, "Too long Category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
