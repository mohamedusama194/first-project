import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is requried"],
      trim: true,
      minlength: [5, "too short user name"],
      maxlength: [30, "too long user name"],
    },
    email: {
      type: String,
      required: [true, "email is requried"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 char"],
      select: false,
    },
    phone: String,
    profileImg: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    active: {
      type: Boolean,
      select: false,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Compare entered password with hashed password in DB
userSchema.methods.correctPassword = function (enteredPassword, userPassword) {
  return bcrypt.compare(enteredPassword, userPassword);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
