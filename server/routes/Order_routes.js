import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createOrder, getOrder } from "../controllers/order_controller.js";
const router = express.Router();

router.post("/:productId", verifyToken,createOrder)
router.get("/", verifyToken, getOrder)

export default router;