import Category from "../models/category.js";
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); 
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; 
        const category = await Category.findById(id); 

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category); 
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};