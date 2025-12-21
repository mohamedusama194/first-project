import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalCartPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  // total price before discount
  this.totalCartPrice = this.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // after discount
  if (this.discount && this.discount > 0) {
    this.totalCartPriceAfterDiscount =
      this.totalCartPrice - (this.totalCartPrice * this.discount) / 100;
  } else {
    this.totalCartPriceAfterDiscount = undefined;
  }

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
