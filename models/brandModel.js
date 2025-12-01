import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand Name Requried"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [30, "Too long brand name"],
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
    const imageUrl = `${process.env.BASE_URL}brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
brandSchema.post("init", function (doc) {
  setImageURL(doc);
});
brandSchema.post("save", function (doc) {
  setImageURL(doc);
});
const brandModel = mongoose.model("brand", brandSchema);
export default brandModel;
