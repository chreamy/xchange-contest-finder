const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],

    message:[
        {
            senderId:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            content:{
                type:String,
                trim:true
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            }  // 紀錄訊息創建的時間
        } 
        
    ]
});

const chatRoom = mongoose.model("chatRoom",chatRoomSchema);

module.exports = chatRoom;