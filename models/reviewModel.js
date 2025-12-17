import mongoose from "mongoose";
import ProductModel from "./productModel.js";
const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: [true, "Review must have rating"],
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product"],
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name ",
  });
  next();
});
reviewSchema.statics.calcAverageRatings = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "product",
        ratingQuantity: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (result.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRating,
      ratingQuantity: result[0].ratingQuantity,
    });
  } else {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingQuantity: 0,
    });
  }
};
reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.product);
});
reviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calcAverageRatings(this.product);
  }
);

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
