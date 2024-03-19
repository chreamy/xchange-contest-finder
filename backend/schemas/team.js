const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// team 要存 chat id 

const teamSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },

    contestId:{
        type:String,
        required:true,
    },

    users:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],

    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"Message",
        default:null,
    },

    teamAdmin:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

    introduction:{
        type:String,
        default:null,
    }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;