const router = require('express').Router();

let Team = require('../schemas/team');

// create team
router.post("/", async (req,res) => {
    try{
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

// delete a product
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
module.exports = router;