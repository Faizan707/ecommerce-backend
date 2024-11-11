import Product from "../models/product.js";
import logger from "../logger.js";  // Import the logger

export const getBestProducts = async (req, res) => {
    try {
        logger.info("Fetching best products");

        const bestProducts = await Product.find({ isBestProduct: true }).populate("category");

        logger.info(`Fetched ${bestProducts.length} best products`);
        res.status(200).json({ bestProducts });
    } catch (error) {
        logger.error("Error fetching best products:", { error });
        res.status(500).json({ message: "Server error", error });
    }
};
