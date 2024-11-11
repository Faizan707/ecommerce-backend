import Order from "../models/order.js";
import Product from "../models/product.js";
import logger from "../logger.js";  // Import the logger

export const createOrder = async (req, res) => {
    try {
        const { userId, products, paymentMethod, shippingAddress, paymentStatus = "Pending", orderStatus = "Processing" } = req.body;

        // Check for required fields
        if (!userId || !products || !paymentMethod || !shippingAddress) {
            logger.warn(`Missing required fields for creating order - userId: ${userId}, products: ${products}, paymentMethod: ${paymentMethod}, shippingAddress: ${shippingAddress}`);
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        logger.info(`Creating order for user: ${userId}`);

        // Fetch product details
        const productDetails = await Promise.all(products.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                logger.warn(`Product not found with ID: ${item.productId}`);
                throw new Error(`Product with ID ${item.productId} not found.`);
            }
            logger.info(`Product found with ID: ${item.productId}, quantity: ${item.quantity}`);
            return { product: product._id, quantity: item.quantity }; // Correctly return the product ID
        }));

        // Calculate total amount
        let totalAmount = 0;
        for (const item of productDetails) {
            const product = await Product.findById(item.product);
            totalAmount += item.quantity * product.price; // Fetch price
            logger.info(`Calculating total: product ID ${item.product}, quantity: ${item.quantity}, price: ${product.price}`);
        }

        logger.info(`Total amount for the order: ${totalAmount}`);

        // Create a new order
        const newOrder = new Order({
            user: userId,
            products: productDetails,
            totalAmount,
            paymentMethod,
            shippingAddress,
            paymentStatus,
            orderStatus
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        logger.info(`Order created successfully for user ID: ${userId}, order ID: ${savedOrder._id}`);
        res.status(201).json(savedOrder);
    } catch (error) {
        logger.error(`Error creating order: ${error.message}`, { error });
        res.status(400).json({ message: error.message });
    }
};
