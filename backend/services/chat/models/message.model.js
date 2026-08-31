import mongoose from "mongoose";

const fileSchmea=new mongoose.Schema({
    name:String,
    content:String
},{
    _id:false
})

const artifactSchema=new mongoose.Schema({
    id:Number,
    type:String,
    title:String, 
    files:[fileSchmea]
},{_id:false})

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
},
images:[String],
artifacts:[artifactSchema]

},{timestamps:true})

const Message=mongoose.model("Message",messageSchema);
export default Message;