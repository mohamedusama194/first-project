import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "user name is requried"],
      trim: true,
      minlength: [5, "too short user name"],
      maxlength: [30, "too long user name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      requried: [true, "email is requried"],
      unique: true,
      loweerecase: true,
    },
    password: {
      type: String,
      requried: [true, "password is requried"],
      minlength: [6, "password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin "],
      default: "user",
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      select: false,
      default: true,
    },
  },
  { timeseries: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare entered password with hashed password in DB
userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
