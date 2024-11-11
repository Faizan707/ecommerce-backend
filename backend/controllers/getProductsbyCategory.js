import Product from "../models/product.js";
import mongoose from "mongoose";
import logger from "../logger.js";  // Import the logger

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const trimmedCategoryId = categoryId.trim();

        logger.info(`Fetching products for category ID: ${trimmedCategoryId}`);

        if (!mongoose.Types.ObjectId.isValid(trimmedCategoryId)) {
            logger.warn(`Invalid category ID: ${trimmedCategoryId}`);
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const products = await Product.find({ category: trimmedCategoryId }).populate("category");

        logger.info(`Found ${products.length} products for category ID: ${trimmedCategoryId}`);
        res.status(200).json({ products });
    } catch (error) {
        logger.error(`Error fetching products for category ID: ${categoryId}`, { error });
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
