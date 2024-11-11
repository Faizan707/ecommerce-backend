import bcrypt from "bcrypt";
import User from "../models/user.js";
import logger from "../logger.js";  // Import the logger

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        logger.warn(`Missing required fields: name, email, or password - name: ${name}, email: ${email}`);
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        logger.info(`Checking if user with email ${email} already exists`);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`User already exists with email: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        logger.info(`Hashing password for user: ${email}`);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        await newUser.save();
        logger.info(`User registered successfully with email: ${email}`);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error(`Error registering user with email: ${email} - ${error.message}`, { error });
        res.status(500).json({ message: 'Server error', error });
    }
};
