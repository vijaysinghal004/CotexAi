import axios from "axios";
import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.model.js"
import crypto from "crypto"
import { PLANS } from "../config/plans.js"
export const createOrders = async (req, res) => {
  try {
    const { plan } = req.body;
    console.log(plan)
    // console.log(req.headers);
    const userId = req.headers["x-user-id"]
    console.log(userId);
    const selectedPlan = PLANS[plan];
    console.log(selectedPlan)

    if (!selectedPlan) {
      return res.status(404).json({ message: "plan not found" })
    }


    // console.log("order")
    const order = await razorpay.orders.create({
      amount: selectedPlan.amount * 100,
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
    })
    console.log("order");

    await Payment.create({
      userId,
      orderId: order.id,
      amount: selectedPlan.amount,
      plan: selectedPlan.id,
      credits: selectedPlan.credits,
      currency: order.currency,
      status: "created"
    })

    return res.status(201).json({ order, plan: selectedPlan })

  } catch (err) {
    console.log("hii")
    return res.status(501).json({ message: "create order error" + err })

  }
}

export const verifypayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(razorpay_order_id);
    const generateSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")


    if (generateSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment veriaction failed" })
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id })
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" })
    }

    payment.status = "paid"
    payment.paymentId = razorpay_payment_id

    await payment.save();

    await axios.post(`${process.env.AUTH_SERVICES}/update-plan`, { userId: payment.userId, plan: payment.plan, credits: payment.credits })
    return res.status(201).json({ message: "Payment Verified" })
  } catch (err) {
    return res.status(501).json({ message: "Verify payment error " + err })
  }
}