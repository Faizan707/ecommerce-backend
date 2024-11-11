import Category from "../models/category.js";
import logger from "../logger.js";  // Import the logger

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        logger.info(`Received request to create category: ${name}`);

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            logger.warn(`Category with name '${name}' already exists.`);
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name });
        await category.save();

        logger.info(`Category '${name}' created successfully with ID: ${category._id}`);
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        logger.error(`Error creating category: ${error.message}`, { error });
        res.status(500).json({ message: "Server error", error });
    }
};
