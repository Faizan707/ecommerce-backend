import dontenv from "dotenv"
import mongoose from "mongoose";
import logger from "../logger.js";
dontenv.config();

export const databaseConnection = async() =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
        });
        logger.info(`Connected to database at ${db.connection.host}`);
    } catch (error) {
        logger.error("Error connecting to database:", { error: error.message });
        process.exit(1);  // Exit the process on failure
    }
};

