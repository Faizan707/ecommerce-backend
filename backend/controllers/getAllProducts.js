import Product from "../models/product.js";
import logger from "../logger.js";  // Import the logger

export const getAllProducts = async (req, res) => {
    try {
        logger.info("Fetching all products");

        const products = await Product.find().populate('category', 'name').lean();

        logger.info(`Fetched ${products.length} products`);
        res.status(200).json(products);
    } catch (error) {
        logger.error("Error fetching products:", { error });
        res.status(500).json({ message: "Server error", error });
    }
};
