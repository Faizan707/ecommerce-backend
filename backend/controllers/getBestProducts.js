export const getBestProducts = async (req, res) => {
    try {
        const bestProducts = await Product.find({ isBestProduct: true }).populate("category");

        res.status(200).json({ bestProducts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
