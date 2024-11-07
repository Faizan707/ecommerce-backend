import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "No description provided." },
    image: { type: String, default: "no-image.jpg" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isBestProduct: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
