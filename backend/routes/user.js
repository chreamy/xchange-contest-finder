const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "436307408633-hnr8ld1jgqgmbcohbt068jc4hq34bcvb.apps.googleusercontent.com"
);
let User = require("../schemas/user");
let Team = require("../schemas/team");
let Contest = require("../schemas/contest");
let Form = require("../schemas/form");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ message: "User route" });
});
router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error("Error logging in user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile/:username", authMiddleware, async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // get the form of the user
    const form = await Form.findOne({ user: user.userId });

    // There's a users array in the team schema, so we need to find all teams where the user is a member
    const teams = await Team.find({ users: user });

    // loop through teams and get the contestId of each team
    const contestIds = teams.map((team) => team.contestId);

    // get all contests where the user is a member of a team
    const contests = [];
    for (let i = 0; i < contestIds.length; i++) {
      const contest = await Contest.findOne({ _hashId: contestIds[i] });
      contests.push(contest);
    }

    res
      .status(200)
      .json({ user: user, form: form, teams: teams, contests: contests });
  } catch (error) {
    console.error("Error getting user profile: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // find user with googleId or email
    const user = await User.findOne({
      $or: [{ googleId: payload["sub"] }, { email: payload["email"] }],
    });

    if (user) {
      res.status(200).json({ message: "User already exists", user: user });
      console.log(payload);
    } else {
      const newUser = new User({
        googleId: payload["sub"],
        email: payload["email"],
        name: payload["name"],
        username: payload["email"].split("@")[0],
      });
      console.log(payload);
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.error("Error verifying Google token: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-favorite", async (req, res) => {
  const { userId, contestId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(contestId)) {
      user.favorites.push(contestId);
      await user.save();
      return res.status(200).json({ message: "Favorite added", user: user });
    } else {
      return res
        .status(200)
        .json({ message: "Favorite already exists", user: user });
    }
  } catch (error) {
    console.error("Error adding favorite: ", error);
    res.status(500).json({ message: "Server error", error: error });
  }
});

router.post("/remove-favorite", async (req, res) => {
  const { userId, contestId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(contestId)) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== contestId.toString()
      );
      await user.save();
      return res.status(200).json({ message: "Favorite removed", user: user });
    } else {
      return res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    console.error("Error removing favorite: ", error);
    res.status(500).json({ message: "Server error", error: error });
  }
});


router.get("/filter", authMiddleware, async (req, res) => {
  const { competitionType } = req.query;
  console.log("Received query parameters:", req.query);
  
  try {
     // Use aggregation to join User and Form collections and filter by competitionType
     const pipeline = [
      {
        $lookup: {
          from: Form.collection.name,
          localField: '_id',
          foreignField: 'userId',
          as: 'forms'
        }
      },
    ];

    // Conditionally add the $match stage if competitionType is provided
    if (competitionType) {
      pipeline.push({
        $match: {
          'forms.competitionType': competitionType
        }
      });
    }

    pipeline.push({
      $project: {
        _id: 1,
        googleId: 1,
        email: 1,
        name: 1,
        username: 1,
        favorites: 1,
        chatUsers: 1,
      }
    });
  
    const users = await User.aggregate(pipeline).exec();

    res.status(200).json({ users });

  } catch (error) {
    console.error("Error filtering users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// check invite
router.post("/confirmInvite", authMiddleware, async(req,res) => {
  const {teamId, userId} = req.body;

  try{
    const team = await Team.findOne({_id:teamId});
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if(!team.users.includes(userId)){
      team.users.push(userId);
      await team.save();
      return res.status(200).json({ message: "User added", team:team });
    } else {
      return res.status(200).json({message: "User is already in the team", team:team});
    }
  } catch(error){
    console.error("Error join team: ", error);
    res.status(500).json({ message: "Server error", error: error });
  }
  
})

module.exports = router;
