import User from "../models/user.js";
import logger from "../logger.js";  // Import the logger

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        logger.info("Fetching all users");

        const users = await User.find({}); 

        logger.info(`Fetched ${users.length} users`);
        res.status(200).json(users);
    } catch (error) {
        logger.error("Error fetching all users:", { error });
        res.status(500).json({ message: "Server error", error });
    }
};

// Get user by ID
export const getUsersById = async (req, res) => {
    try {
        const { userId } = req.params;

        logger.info(`Fetching user with ID: ${userId}`);
        const user = await User.findOne({ _id: userId });

        if (!user) {
            logger.warn(`User with ID: ${userId} not found`);
            return res.status(404).json({ message: "User not found" });
        }

        logger.info(`Fetched user with ID: ${userId}`);
        res.status(200).json(user);
    } catch (error) {
        logger.error(`Error fetching user with ID: ${userId}`, { error });
        res.status(500).json({ message: "Internal server error", error });
    }
};
