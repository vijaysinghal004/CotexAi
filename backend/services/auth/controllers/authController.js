import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import { User } from "../models/userModel.js";
import redis from "../../../shared/redis/redis.js";
export const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        const user = await User.findOne({
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

        await redis.set(`session-${sessionId}`,JSON.stringify({
            userID:user._id,
            name:user.name,
            email:user.email,
            avtar:user.avtar
        }),"EX",7*24*60*60)
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 60 * 60 * 1000
        })
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error"+err })
    }
}

export const logout=async(req,res)=>{
    try{
 const sessionId=req.cookie?.session;
 await redis.del(`session-${sessionId}`)
 res.clearCookie("session");
 return res.status(200).json({message:"logout successfully"})
    }catch(err){
 return res.status(500).json({message:`logout error ${err}`})
    }
}