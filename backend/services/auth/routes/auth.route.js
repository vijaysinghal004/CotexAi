import express from "express";
import {deductCredits, login, logout, updateUserPayment} from "../controllers/authController.js"
const router=express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.post("/update-plan",updateUserPayment);
router.post("/deduct-credits",deductCredits);

export default router;
