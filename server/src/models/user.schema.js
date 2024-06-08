import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Name should not exceed 50 character"],
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      maxLength: [50, "Name should not exceed 50 character"],
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxLength: [50, "Name should not exceed 50 character"],
    },
    MobileNumber: {
      type: Number,
      trim: true,
      maxLength: [10, "Number should not exceed 10 digits."],
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false, // when you try to bring password it won't auto select and bring it.
      required: [true, "Password is required"],
      minLength: [8, "Min characters should be 8"],
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// encrypting the password before saving: HOOKS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
  // generate JWT token jwt.sign(payload (you can give anything as a payload), secretOrPrivateKey, [options, callback])
  generateToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        username: this.username,
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY }
    );
  },
};
const User = mongoose.model("User", userSchema);

export default User;
