import express from "express";
import {
  signUp,
  login,
  logout,
  getAllUsers,
  updateUserProfile,
  updateAvatar,
  getUserById,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/Authenticate.js";

const router = express.Router();

router.post("/signup", signUp);
router.put("/profile/:id", isAuthenticated, updateUserProfile);
router.post("/avatar", isAuthenticated, updateAvatar);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getAllUsers);
router.get("/user-by-id/:id", getUserById);
export default router;
