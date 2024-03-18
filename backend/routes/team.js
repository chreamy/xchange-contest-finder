const router = require('express').Router();

let Team = require('../schemas/team');
let Message = require('../schemas/message');


// create team
// 辨識該user是否已經建立過 team or 參加 team
router.post("/", async (req,res) => {
    try{
        if (!req.body.teamName) {
            return res.status(400).json({message: "Team name is required"});
        }

        const team = await Team.create(req.body);
        res.status(200).json(team);
        
    }catch(error){
        console.error("Error creating team: ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

// get all team
router.get("/", async(req,res) => {
    try{
        const teams = await Team.find({});
        res.status(200).json(teams);
    }catch (error){
        res.status(500).json({message:error.message});
    }
});

// get team by id
router.get("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const team = await Team.findById(id);
        res.status(200).json(team);
    } catch (error){
        res.status(500).json({message:error.message});
    }
});

// update a team
router.put("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const team = await Team.findByIdAndUpdate(id, req.body);

        if(!team){
            return res.status(404).json({message:"Team not found"});
        }

        const updatedTeam = await Team.findById(id);

        res.status(200).json(updatedTeam);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

// delete a team
router.delete("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);

        if(!team){
            res.status(404).json({message:"Team not found"});
        }

        res.status(200).json({ message: "Team deleted successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

// 增加user到Team
router.put("/addUser", async(req,res) => {
    const { teamId, userId } = req.body;

    const added = Team.findByIdAndDelete(
        teamId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
            .populate("teamAdmin, -password");

    if (!added) {
        return res.status(404);
        throw new Error("Team not found");
    } else {
        res.json(added);
    }
});

router.put("/removeUser", async(req,res) => {
    
});

module.exports = router;