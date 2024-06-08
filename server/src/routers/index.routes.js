import { Router } from "express";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import commentRoutes from "./comment.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/comments", commentRoutes);

export default router;
