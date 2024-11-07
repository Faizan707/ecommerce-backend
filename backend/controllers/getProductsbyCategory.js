import Product from "../models/product.js"; 
import mongoose from "mongoose";

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;


        const trimmedCategoryId = categoryId.trim();

        if (!mongoose.Types.ObjectId.isValid(trimmedCategoryId)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }


        const products = await Product.find({ category: trimmedCategoryId }).populate("category");

      res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products by category:", error); 
        res.status(500).json({ message: "Server error", error: error.message }); 
    }
};
