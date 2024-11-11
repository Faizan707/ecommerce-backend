import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.SECRECT_KEY;

if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables.");
    process.exit(1); // Exit the process if JWT_SECRET is missing
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        console.log(`Login attempt with email: ${email}`);

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`Invalid login attempt. Email not found: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`Invalid password for email: ${email}`);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token with user details
        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(`User logged in successfully: ${email}`);

        // Respond with the token
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
