const router = require("express").Router();

let Team = require('../schemas/team');
let User = require('../schemas/user');

const authMiddleware = require("../middleware/authMiddleware");

// create team
router.post("/add", authMiddleware,async (req, res) => {
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
router.get("/",async (req, res) => {
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
router.patch("/update/:_id", authMiddleware,async (req, res) => {
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
router.delete("/:_id", authMiddleware,async (req, res) => {
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



// 將user從team中移除
router.patch("/removeUser", authMiddleware,async(req,res) => {
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

// 申請加入隊伍
// 會發出一個 notice 給所有在team內的人
router.post("/joinTeam",authMiddleware,async(req,res) => {
  const { userId, teamId } = req.body;

  try {
    const team = await Team.findById(teamId).populate('users');
    const user = await User.findById(userId);

    if (!team || !user) {
      return res.status(404).json({ error: "User or Team not found" });
    }

    const userName = user.name;
    const teamName = team.name;
    const notice = `${userName} wants to join your Team ${teamName}`;

    // Add the notice to each user in the team
    const updatePromises = team.users.map(async (teamUserId) => {
      const teamUser = await User.findById(teamUserId);
      if (teamUser) {
        teamUser.notice.push(notice);
        return teamUser.save();
      }
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Join request sent', notice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// 增加user到Team
// 隊長按下確認的 button
router.patch("/addUser",authMiddleware, async(req,res) => {
  const { teamId, userId } = req.body;

  const added = await Team.findByIdAndUpdate(
      teamId,
      {
          $push: { users: userId },
      },
      { new: true }
  ).populate("users", "-password")
    .populate("teamAdmin", "-password");

  if (!added) {
      return res.status(404).json("Team not found");
  } else {
      res.json(added);
  }
});

// 寄送邀請給 user
router.post("/invite", authMiddleware, async (req,res) => {
  const { userId, teamId } = req.body;

  try{
    const teamName = await Team.findById(teamId).populate('name');
    // push notice for user.
    const notice = `${teamName} invited you to join their team`;

    const addNotice = await User.findByIdAndUpdate(
      userId,
      {
        $push: { notice: notice},
      },
      { new: true}
    )

    if (!added) {
      return res.status(404).json("Team not found");
    } else {
        res.json(added);
    }
  } catch(error){
    res.status(400).json({ error: error.message });
  }
  
})


// create message and store in the Message & Team Collection
router.post("/pushNotice", authMiddleware,async (req, res) => {
    const { senderId, content, teamId,access } = req.body;
    
    console.log(req.body);

    try {
      // 將message存入Team lastMessage
      await Team.findByIdAndUpdate(teamId, 
        {
          $push : {
            notice:{
              content:content,
              sender:senderId,
              access:access
            }
          },
        },
        { new: true}       
      );

      res.status(200).json(req.body);

    } catch(error) {
      res.status(400).json({ message: error.message });
    }

});

router.get("/getNotice/:teamId", authMiddleware,async (req, res) => {

  const { teamId } = req.params;
  // get the notice from the team
  try {
    const team = await Team.findById(teamId);
    console.log(team.notice);
    res.status(200).json(team.notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
