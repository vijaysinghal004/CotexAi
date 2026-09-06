import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,
    avtar:String,
    plan:{
        type:String,
        default:"free"
    },
    credits:{
        type:Number,
        default:100
    },
    totalCredits:{
        type:Number,
        default:500
    },
    planExpiresAt:Date
},{timestamps:true})

export const User=mongoose.model("User",userSchema);

// export default User;