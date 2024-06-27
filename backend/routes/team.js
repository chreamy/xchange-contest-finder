const router = require("express").Router();

let Team = require('../schemas/team');
let User = require('../schemas/user');
let Form = require("../schemas/form");

const authMiddleware = require("../middleware/authMiddleware");

// get all team
router.get("/",async (req, res) => {
  try {
    const teams = await Team.find({})
      .populate("contestId","title");
    // name, numOfUsers, contestTitle, introduction

    console.log(teams);

    const teamDetail = await Promise.all(teams.map( async (team) => {
      return {
        teamId:team._id, 
        teamName: team.name,
        contestTitle: team.contestId.title,
        numberOfUsers: team.users.length,
        introduction: team.introduction
      };
    }));

    res.status(200).json(teamDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get team by id
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const team = await Team.findById(_id)
      .populate("contestId","title")
      .populate("teamAdmin","name")
      .populate("notice.sender","name");


    if(!team){
      return res.status(404).json({ message: 'Team not found' });
    }

    const teamInfo = {
      teamId:team._id,
      name: team.name,
      contestTitle: team.contestId.title,
      numberOfUsers: team.users.length,
      notices: team.notice.map(notice => ({
          content: notice.content,
          sender: notice.sender.name,
          createdAt: formatDate(notice.createdAt)
      })),
      teamAdminName: team.teamAdmin.name,
      introduction: team.introduction
  };

    res.status(200).json(teamInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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


// 編輯隊伍資料
router.patch("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    
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
  try {  
    const { teamId } = req.body;
    const user = req.user;

    const team = await Team.findById(teamId).populate('users');

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

    // add asked users into team
    team.askedUsers.push(user._id);
    await team.save();

    res.status(200).json({ message: 'Join request sent', notice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 同意user加入到Team
// 隊長按下確認的 button
router.patch("/addUser",authMiddleware, async(req,res) => {
  const { teamId } = req.body;
  const user = req.user;

  try{
    const added = await Team.findByIdAndUpdate(
      teamId,
      {
          $push: { users: user._id },
      },
      { new: true }
    ).populate("users", "-password")
      .populate("teamAdmin", "-password");

    if (!added) {
        return res.status(404).json("Team not found");
    } else {
        res.status(200).json(added);
    }
  } catch(error) {
    res.status(500).json({error:error.message});
  }
  
});

// 拒絕user加入
router.patch("/denyForJoin", authMiddleware, async(req,res) => {
  // delete askedUser
  const { userId, teamId } = req.body;

  try{
    const team = await Team.findByIdAndDelete(
      teamId,
      {
        $pull: { askedUsers: userId }
      },
      { new : true}
    );

    if(!team) {
      res.status(400).json({Message: 'Team not found'});
    }

    res.status(200).json({ Message: 'Deny user for joining'});
  } catch (error){
    res.status(500).json({ error: error.message })
  }
})

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

    if (!addNotice) {
      return res.status(404).json("Team not found");
    } else {
        res.json(addNotice);
    }
  } catch(error){
    res.status(400).json({ error: error.message });
  }
  
})


// create message and store in the Message & Team Collection
router.post("/pushNotice", authMiddleware,async (req, res) => {
    const { senderId, content, teamId,access } = req.body;

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

// 查詢單一隊伍公告
router.get("/getNotice/:_id",async (req, res) => {
  const { _id } = req.params;
  // get the notice from the team
  try {
    const team = await Team.findById(_id).populate('notice.sender');
    const teamNotices = team.notice.map(notice => ({
      noticeId:notice._id,
      sender:notice.sender.name,
      content:notice.content,
      createdAt:formatDate(notice.createdAt)
    }))
    res.status(200).json(teamNotices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 隊友資訊
router.post("/getUsersOfTeam", async(req, res) => {
  const { teamId } = req.body;

  try {
    const team = await Team.findById(teamId).populate("users", "name");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const usersData = await Promise.all(team.users.map(async (user) => {
      const form = await Form.findOne({ userId: user._id });
      return {
        name: user.name,
        identity: form ? form.identity : "尚未透露",
      };
    }));

    res.json(usersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports = router;
