import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
dotenv.config();

export const loginAdmin = async (req, res) => {
    const JWT_SECRET = process.env.SECRECT_KEY; 
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized: Admin only' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token with admin details
        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with the token and admin details
        res.json({
            message: 'Admin logged in successfully',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
