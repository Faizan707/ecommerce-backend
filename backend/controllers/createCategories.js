import Category from "../models/category.js";
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name });
        await category.save();

        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
