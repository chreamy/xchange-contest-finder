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
        type:Schema.Types.ObjectId,
        ref:"Contests",
        required:true,
    },

    users:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],

    notice:[{
        content:{
            type:String,
            trim: true
        },
        sender:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        createdAt:{
            type: Date,
            default: Date.now(),
        },
        // 公告的權限，true 為對外公開，false 為僅限成員可見
        access:{
            type:Boolean,
            default:true,
        }
    }],

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