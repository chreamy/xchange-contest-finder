const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    usersId:[{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],
    introduction:String,
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;