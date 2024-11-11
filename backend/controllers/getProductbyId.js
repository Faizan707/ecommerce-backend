import Product from "../models/product.js";
import logger from "../logger.js";  // Import the logger

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        logger.info(`Fetching product with ID: ${productId}`);

        const product = await Product.findById(productId).populate("category");

        if (!product) {
            logger.warn(`Product with ID: ${productId} not found`);
            return res.status(404).json({ message: "Product not found" });
        }

        logger.info(`Product with ID: ${productId} fetched successfully`);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`Error fetching product with ID: ${productId}`, { error });
        res.status(500).json({ message: "Server error", error });
    }
};
