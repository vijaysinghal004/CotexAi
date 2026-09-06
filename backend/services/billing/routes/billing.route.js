import express from "express"
import { createOrders, verifypayment } from "../controllers/billing.controller.js";
const router=express.Router();

router.post("/create-order",createOrders)
router.post("/verify-order",verifypayment)

export default router;