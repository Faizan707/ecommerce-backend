import Order from "../models/order.js";
import User from "../models/user.js";

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus, orderStatus } = req.body;

        // Ensure at least one field to update is provided
        if (!paymentStatus && !orderStatus) {
            return res.status(400).json({ message: "At least one of paymentStatus or orderStatus is required." });
        }

        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('products.product', 'title image');

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Update fields if they are provided
        if (paymentStatus) order.paymentStatus = paymentStatus;
        if (orderStatus) order.orderStatus = orderStatus;

        const updatedOrder = await order.save();

        // Send the updated order back to the client
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email') 
            .populate('products.product', 'title image');

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;


        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const orders = await Order.find({ user: userId })
            .populate('products.product', 'title image')
            .populate('user', 'name email');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders); 
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
