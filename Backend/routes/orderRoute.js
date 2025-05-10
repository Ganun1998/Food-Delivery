import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, listOrder, updateStatus, removeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

// endpoints
orderRouter.post("/place", authMiddleware,placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders",authMiddleware, userOrders)
orderRouter.get("/list", listOrder)
orderRouter.post("/status", updateStatus)
orderRouter.post("/remove", removeOrder)



export default orderRouter;