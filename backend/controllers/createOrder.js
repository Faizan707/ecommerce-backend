import Order from "../models/order.js";
import Product from "../models/product.js";

export const createOrder = async (req, res) => {
    try {

        const { userId, products, paymentMethod, shippingAddress, paymentStatus = "Pending", orderStatus = "Processing" } = req.body;

        // Check for required fields
        if (!userId || !products || !paymentMethod || !shippingAddress) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Fetch product details
        const productDetails = await Promise.all(products.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            return { product: product._id, quantity: item.quantity }; // Correctly return the product ID
        }));

        // Calculate total amount
        let totalAmount = 0;

        for (const item of productDetails) {
            const product = await Product.findById(item.product);
            totalAmount += item.quantity * product.price; // Fetch price
        }

        // Create a new order
        const newOrder = new Order({
            user: userId,
            products: productDetails,
            totalAmount,
            paymentMethod,
            shippingAddress,
            paymentStatus: "Pending",
            orderStatus: "Processing"
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(400).json({ message: error.message });
    }
};