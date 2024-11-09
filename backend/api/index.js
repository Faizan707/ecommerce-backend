import express from "express";
import { databaseConnection } from "../config/db.js";
import adminRoutes from "../routes/admin.routes.js";
import userRoutes from "../routes/user.routes.js";
import productRoutes from "../routes/porduct.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import orderRoutes from "../routes/order.routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Connect to database
databaseConnection();

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Enable CORS
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Measure request time
app.use((req, res, next) => {
  const start = Date.now(); // Record the start time

  res.on('finish', () => {
    const end = Date.now(); // Record the end time
    const timeTaken = end - start;
    console.log(`${req.method} ${req.originalUrl} took ${timeTaken}ms`);
  });

  next(); // Continue to the next middleware or route handler
});

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin-login", adminRoutes);
app.use("/api/", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/", categoryRoutes);
app.use("/api/order", orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log("Connected to port", PORT);
});
