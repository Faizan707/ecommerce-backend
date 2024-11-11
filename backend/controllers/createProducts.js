import Product from "../models/product.js";
import Category from "../models/category.js";
import logger from "../logger.js";  // Import the logger

export const createProducts = async (req, res) => {
    try {
        const { title, price, description, categoryId, isBestProduct } = req.body;

        // Check if an image was uploaded
        let image = '';
        if (req.file) {
            // Convert the image buffer to Base64
            image = req.file.buffer.toString('base64');
            logger.info(`Image uploaded for product: ${title}`);
        } else {
            image = ''; 
            logger.warn(`No image uploaded for product: ${title}`);
        }

        // Check if the category exists
        const category = await Category.findById({ _id: categoryId });
        if (!category) {
            logger.warn(`Category not found for category ID: ${categoryId}`);
            return res.status(404).json({ message: "Category not found" });
        }

        logger.info(`Creating product with title: ${title}, category: ${categoryId}`);

        // Create the product
        const product = new Product({
            title,
            price,
            description,
            image,
            category: categoryId,
            isBestProduct
        });

        await product.save();
        logger.info(`Product created successfully with ID: ${product._id}`);

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        logger.error(`Error creating product: ${error.message}`, { error });
        res.status(500).json({ message: "Server error", error });
    }
};
