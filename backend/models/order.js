import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, 
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalAmount: { type: Number, required: true, min: 0 }, 
    paymentStatus: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed", "Refunded"], 
        default: "Pending" 
    },
    orderStatus: { 
        type: String, 
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
        default: "Processing" 
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { 
        type: String, 
        enum: ["Credit Card", "PayPal", "Cash on delivery"], 
        required: true 
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
