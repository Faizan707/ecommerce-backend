import Product from "../models/product.js";
export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndDelete(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}