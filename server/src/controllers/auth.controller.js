import User from "../models/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customeError.js";

const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

export const signUp = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    address,
    avatar,
    MobileNumber,
  } = req.body;

  if (!username || !email || !password) {
    throw new CustomError("Please fill all the fields Required", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exist", 400);
  }

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    address,
    avatar,
    MobileNumber,
  });

  const token = user.generateToken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please fill all the fields", 400);
  }

  const newUser = await User.findOne({ email }).select("+password");

  if (!newUser) {
    throw new CustomError("Invalid credentials", 400);
  }

  const isPasswordMatched = await newUser.comparePassword(password);

  if (isPasswordMatched) {
    const token = newUser.generateToken();
    (newUser.password = undefined), res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      newUser,
    });
  }

  throw new CustomError("Email / Password is incorrect", 400);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    throw new CustomError("No users found", 404);
  }
  res.status(200).json({
    success: true,
    users,
  });
});
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    firstname,
    lastname,
    email,
    username,
    MobileNumber,
    address,
    currentPassword,
    newPassword,
  } = req.body;

  // Fetch the user with the password field
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  // Check if currentPassword is provided and compare it
  if (currentPassword) {
    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      throw new CustomError("Current password is incorrect", 400);
    }

    // If newPassword is provided, update it
    if (newPassword) {
      user.password = newPassword;
    }
  }

  // Update other user details
  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.username = username || user.username;
  user.MobileNumber = MobileNumber || user.MobileNumber;
  user.address = address || user.address;
  user.email = email || user.email;

  // Save the updated user
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const avatar = req.file.path;

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    user,
  });
});
export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
