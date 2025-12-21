import mongoose from "mongoose";

const coponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: [true, "copon code is required"],
      unique: true,
    },
    discount: {
      type: Number,
      required: [true, "copon discount is required"],
    },
    expireDate: {
      type: Date,
      required: [true, "copon expire date is required"],
    },
  },
  { timestamps: true }
);
const CoponModel = mongoose.model("Copon", coponSchema);
export default CoponModel;
