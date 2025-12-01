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
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
categorySchema.post("init", function (doc) {
  setImageURL(doc);
});
categorySchema.post("save", function (doc) {
  setImageURL(doc);
});
const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
