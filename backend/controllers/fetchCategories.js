import Category from "../models/category.js";
import logger from "../logger.js";  // Import the logger

// Get all categories
// Error handling for category fetching
export const getAllCategories = async (req, res) => {
    try {
        logger.info("Fetching all categories");

        const categories = await Category.find(); 

        logger.info(`Fetched ${categories.length} categories`);
        res.status(200).json(categories);
    } catch (error) {
        logger.error("Error fetching categories:", { 
            message: error.message, 
            stack: error.stack 
        });
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; 

        logger.info(`Fetching category with ID: ${id}`);
        const category = await Category.findById(id); 

        if (!category) {
            logger.warn(`Category with ID: ${id} not found`);
            return res.status(404).json({ message: "Category not found" });
        }

        logger.info(`Fetched category with ID: ${id}`);
        res.status(200).json(category); 
    } catch (error) {
        logger.error(`Error fetching category with ID: ${id}`, { error });
        res.status(500).json({ message: "Server error", error });
    }
};
