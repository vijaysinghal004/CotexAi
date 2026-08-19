import mongoose from "mongoose";

const userSchema =new mngoose.Schema({
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,
    avtar:String
},{timestamps:true})

const User=mongoose.model("User",userSchema);

export default User;