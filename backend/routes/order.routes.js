import express from "express";
import { createOrder } from "../controllers/createOrder.js";
import { authenticateToken, checkAdmin, } from "../middleware/auth.js";
import { deleteOrder, getAllOrders, getUserOrders, updateOrder, } from "../controllers/changeOrder.js";

const router = express.Router()

router.post("/user",authenticateToken,createOrder)
router.put("/:orderId",authenticateToken,checkAdmin,updateOrder)
router.get("/getOrders",authenticateToken,checkAdmin,getAllOrders)
router.get("/getOrders/:userId",authenticateToken,getUserOrders)
router.delete("/order/:orderID",authenticateToken,checkAdmin,deleteOrder)
export default router