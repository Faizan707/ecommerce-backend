import dotenv from "dotenv"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
dotenv.config()
const JWT_SECRET = process.env.SECRECT_KEY
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, name:user.name,role: user.role }, JWT_SECRET, {
            expiresIn: '1h', 
        });

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Login error:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};
