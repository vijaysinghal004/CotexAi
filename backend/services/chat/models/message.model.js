import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
conversationId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"conversation"
},
role:{
    type:String,
    enum:["user","assistant"]
},
content:{
    type:String
}

},{timestamps:true})

const Message=mongoose.model("Message",messageSchema);
export default Message;