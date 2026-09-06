import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import { User } from "../models/userModel.js";
import redis from "../../../shared/redis/redis.js";
export const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({
            firebaseUid: decoded.uid
        });
        if (!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                email: decoded.email,
                name: decoded.name,
                avtar: decoded.picture
            })
        }
        const sessionId = crypto.randomUUID()
       await redis.set(`user-session-${user._id}`,
        sessionId,"EX", 7 * 24 * 60 * 60)
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avtar: user.avtar,
            plan: user.plan,
            credits: user.credits,
            totalCredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt
        }), "EX", 7 * 24 * 60 * 60)
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 60 * 60 * 1000
        })
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" + err })
    }
}

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookie?.session;
        await redis.del(`session-${sessionId}`)
        res.clearCookie("session");
        return res.status(200).json({ message: "logout successfully" })
    } catch (err) {
        return res.status(500).json({ message: `logout error ${err}` })
    }
}



export const updateUserPayment = async (req, res) => {
    try {
        const { plan, credits, userId } = req.body;
        const user = await User.findById(userId)
        if (!user) {
           return res.status(400).json({ message: "user not found" })
        }
        user.plan = plan;
        // user.credits = credits
        user.credits = (user.credits ?? 0) + Number(credits);
        user.totalCredits = (user.totalCredits ?? 0) + Number(credits);
        // user.totalCredits += credits
        user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

        await user.save()

        const sessionId=  await redis.get(`user-session-${user?._id}`)
        // console.log("vijay "+sessionId);
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avtar: user.avtar,
            plan: user.plan,
            credits: user.credits,
            totalCredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt
        }), "EX", 7 * 24 * 60 * 60)


        return res.status(201).json({ success: true })
    } catch (err) {
        return res.status(501).json({ message: "Update user payment error" + err })
    }
}

export const deductCredits=async(req,res)=>{
    try{
  const {userId,agent}=req.body;
  const COST    ={
    chat:1,
    search:5,
    coding:10,
    pdf:10,
    ppt:10,
    vision:10
  }

  const user=await User.findById(userId);
  if(!user){
        return res.status(400).json({message:"user not found"})
  }
  const requiredCredits=COST[agent]||1
  if(user.credits<requiredCredits){
        return res.status(401).json({message:"not enough credits."})
  }
  user.credits-=requiredCredits
  await user.save()
          const sessionId=  await redis.get(`user-session-${user?._id}`)
        // console.log("vijay "+sessionId);
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avtar: user.avtar,
            plan: user.plan,
            credits: user.credits,
            totalcredits: user.totalCredits,
            planExpiresAt: user.planExpiresAt
        }), "EX", 7 * 24 * 60 * 60)

        return res.status(201).json({ success: true,credits:user.credits })
    }catch(err){
        return res.status(501).json({ message: "deduct credits error" + err })
    }
}