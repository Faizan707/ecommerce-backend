import Product from "../models/product.js";
import Category from "../models/category.js";

export const createProducts = async (req, res) => {
    try {
        const { title, price, description, categoryId, isBestProduct } = req.body;

        // Check if an image was uploaded
        let image = '';
        if (req.file) {
            // Convert the image buffer to Base64
            image = req.file.buffer.toString('base64');
        } else {
            image = ''; 
        }

        const category = await Category.findById({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const product = new Product({
            title,
            price,
            description,
            image,  
            category: categoryId,
            isBestProduct
        });

        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
