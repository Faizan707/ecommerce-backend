import express from "express";
import {databaseConnection} from "../config/db.js"
import adminRoutes from "../routes/admin.routes.js";
import userRoutes from "../routes/user.routes.js"
import productRoutes from "../routes/porduct.routes.js"
import categoryRoutes from "../routes/category.routes.js"
import orderRoutes from "../routes/order.routes.js"
import cors from "cors"
const app = express();
import dotenv from "dotenv"

 dotenv.config()

 const PORT = process.env.PORT
databaseConnection();
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  optionsSuccessStatus: 204 // For legacy browser support
}));

// Ensure preflight requests are handled
app.options('*', cors());

  app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin-login", adminRoutes);
app.use("/api/",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/",categoryRoutes)
app.use("/api/order",orderRoutes)

app.listen(PORT,()=>{
    console.log("connect to port",PORT)
})