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

    messages:{
        content:{
            type:String,
            trim: true
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        createdAt:{
            type: Date,
            default: Date.now(),
        }
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