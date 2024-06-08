import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import CustomError from "../utils/customeError.js";
import asyncHandler from "../utils/asyncHandler.js";
import config from "../config/config.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomError("You need to log in to access this resource", 401);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});
