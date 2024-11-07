import express from "express";
import { createProducts } from "../controllers/createProducts.js";
import multer from "multer";
import { authenticateToken, checkAdmin } from "../middleware/auth.js";
import { getBestProducts } from "../controllers/getBestProducts.js";
import { getProductsByCategory } from "../controllers/getProductsbyCategory.js";
import { getProductById } from "../controllers/getProductbyId.js";
import { deleteProductById } from "../controllers/deleteProductById.js";
import { getAllProducts } from "../controllers/getAllProducts.js";
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Specific routes first
router.get("/get-products", getAllProducts);
router.get("/best-products", getBestProducts);
router.get("/category/:categoryId", getProductsByCategory);

// Dynamic route at the end
router.get("/:productId", getProductById);

// POST, DELETE, etc.
router.post("/", authenticateToken, checkAdmin, upload.single('image'), createProducts);
router.delete("/delete/:productId", deleteProductById);

export default router;
