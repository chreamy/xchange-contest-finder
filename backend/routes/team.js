const router = require("express").Router();

let Team = require('../schemas/team');
let Message = require('../schemas/message');
let User = require('../schemas/user');


// create team
router.post("/add", async (req, res) => {
  try {
    // 一個User只能在一個比賽內創建一支隊伍
    const { teamAdmin, contestId } = req.body;
    const team = await Team.findOne({ 
      teamAdmin: teamAdmin,
      contestId: contestId
    })

    // 若teamAdmin已經在該contest下創建隊伍，則不允許再次創建
    if (team) {
      return res.status(400).json({ message: "You cannot create more than one team for each contest." });
    }

    const newTeam = await Team.create(req.body);
    console.log(req.body);
    res.status(200).json(newTeam);
  } catch (error) {
    console.error("Error creating team: ", error);
    res.status(500).json({ message: error.message });
  }
});

// get all team
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get team by id
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const team = await Team.findById(_id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a team
router.patch("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.body);
    
    // 若更新的id為錯時，會顯示Team not found 但卻又新增一個team，顯然不合理?
    const team = await Team.findOneAndUpdate({ _id: _id }, req.body, {
      new: true,
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const updatedTeam = await Team.findById(_id);

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a team
router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const team = await Team.findByIdAndDelete(_id);

    if (!team) {
      res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 增加user到Team
router.patch("/addUser", async(req,res) => {
    const { teamId, userId } = req.body;
    console.log(req.body);
    const added = await Team.findByIdAndUpdate(
        teamId,
        {
            $push: { users: userId },
        },
        { new: true }
    )
        .populate("users", "-password")
            .populate("teamAdmin", "-password");

    if (!added) {
        return res.status(404).json("Team not found");
    } else {
        res.json(added);
    }
});

// 將user從team中移除
router.patch("/removeUser", async(req,res) => {
    const { teamId,userId } = req.body;

    const removed = await Team.findByIdAndUpdate(
        teamId,
        {
            $pull: { users:userId },
        },
        { new: true }
    )
        .populate("users", "-password")
            .populate("teamAdmin", "-password");

    if(!removed) {
        return res.status(404).json("Team not found");
    } else {
        res.json(removed);
    }
});


// create message and store in the Message & Team Collection
router.post("/sendMessage", async (req, res) => {
    const { teamId, content,sender } = req.body;
    
    console.log(req.body);

    try {
      // 將message存入Message Collection
      var newMessage = await Message.create({ sender:sender, content:content, teamId:teamId });

      newMessage = await newMessage.populate("sender","name email");
  
      // 將message存入Team lastMessage
      await Team.findByIdAndUpdate(teamId, {
        lastMessage: newMessage,
      });

      res.status(200).json(newMessage);

    } catch(error) {
      res.status(400).json({ message: error.message });
    }

});


module.exports = router;
