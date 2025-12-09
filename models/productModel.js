import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minlength: [3, "too shot product tiitle"],
      maxlength: [100, "too Long product tiitle"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      require: [true, "plese enter Desc for this product"],
      minlength: [3, "too shot product description"],
    },
    quantity: {
      type: Number,
      require: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, "pls enter price for this product"],
      trim: true,
      max: [200000, "u must enter price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      require: [true, "u must enter imageCover for this product "],
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must be belong to category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal one"],
      max: [5, "rating must be above or equal one"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ProductSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
