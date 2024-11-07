import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getUsersById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
