import Product from "../models/product.js";

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
