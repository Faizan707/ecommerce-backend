import Product from "../models/product.js";


export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category', 'name'); 
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  