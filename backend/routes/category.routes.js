import express from "express";
import { createCategory } from "../controllers/createCategories.js";
import { authenticateToken, checkAdmin } from "../middleware/auth.js";
import { getAllCategories, getCategoryById } from "../controllers/fetchCategories.js";

const router = express.Router();

router.post("/create-category", authenticateToken, checkAdmin, createCategory);
router.get("/categories",getAllCategories)
router.get("/categories/:id",getCategoryById)

export default router