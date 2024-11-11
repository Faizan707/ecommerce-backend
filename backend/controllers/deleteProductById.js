import Product from "../models/product.js";
import logger from "../logger.js";  // Import the logger

export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        
        logger.info(`Attempting to delete product with ID: ${productId}`);

        const product = await Product.findByIdAndDelete(productId);
        
        if (!product) {
            logger.warn(`Product with ID: ${productId} not found`);
            return res.status(404).json({ message: "Product not found" });
        }

        logger.info(`Product with ID: ${productId} deleted successfully`);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting product with ID: ${productId} - ${error.message}`, { error });
        res.status(500).json({ message: "Server error", error });
    }
};
