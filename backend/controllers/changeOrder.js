import Order from "../models/order.js";
import User from "../models/user.js";
import logger from "../logger.js";  

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus, orderStatus } = req.body;

        if (!paymentStatus && !orderStatus) {
            logger.warn(`Order update failed - No paymentStatus or orderStatus provided for order ID: ${orderId}`);
            return res.status(400).json({ message: "At least one of paymentStatus or orderStatus is required." });
        }

        logger.info(`Fetching order with ID: ${orderId}`);
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('products.product', 'title image');

        if (!order) {
            logger.warn(`Order not found with ID: ${orderId}`);
            return res.status(404).json({ message: "Order not found." });
        }

        if (paymentStatus) order.paymentStatus = paymentStatus;
        if (orderStatus) order.orderStatus = orderStatus;

        const updatedOrder = await order.save();
        logger.info(`Order with ID: ${orderId} updated successfully`);

        res.status(200).json(updatedOrder);
    } catch (error) {
        logger.error(`Error updating order with ID: ${req.params.orderId} - ${error.message}`, { error });
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        logger.info(`Fetching all orders`);
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('products.product', 'title image');

        logger.info(`Successfully fetched all orders`);
        res.status(200).json(orders);
    } catch (error) {
        logger.error(`Error fetching all orders - ${error.message}`, { error });
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        logger.info(`Fetching user with ID: ${userId}`);
        const user = await User.findOne({ _id: userId });

        if (!user) {
            logger.warn(`User not found with ID: ${userId}`);
            return res.status(404).json({ message: "User not found." });
        }

        logger.info(`Fetching orders for user ID: ${userId}`);
        const orders = await Order.find({ user: userId })
            .populate('products.product', 'title image')
            .populate('user', 'name email');

        if (!orders || orders.length === 0) {
            logger.warn(`No orders found for user ID: ${userId}`);
            return res.status(404).json({ message: "No orders found for this user." });
        }

        logger.info(`Successfully fetched orders for user ID: ${userId}`);
        res.status(200).json(orders);
    } catch (error) {
        logger.error(`Error fetching orders for user ID: ${userId} - ${error.message}`, { error });
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        logger.info(`Attempting to delete order with ID: ${orderId}`);
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            logger.warn(`Order not found with ID: ${orderId}`);
            return res.status(404).json({ message: "Order not found." });
        }

        logger.info(`Order with ID: ${orderId} deleted successfully`);
        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        logger.error(`Error deleting order with ID: ${orderId} - ${error.message}`, { error });
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
