const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "436307408633-hnr8ld1jgqgmbcohbt068jc4hq34bcvb.apps.googleusercontent.com"
);
let User = require("../schemas/user");
const User2 = require("../schemas/user2");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ message: "User route" });
});
router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const user = await User2.findOne({
      email: email,
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User2({
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
}
);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User2
      .findOne({ email: email });
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
    const user = await User
      .findOneAndDelete({ username: username });
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

router.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload["sub"]);
    const user = await User.findOne({ userId: payload["sub"] });

    if (user) {
      res.status(200).json({ message: "User already exists", user: user });
    } else {
      const newUser = new User({
        googleId: payload["sub"],
        email: payload["email"],
        name: payload["name"],
      });

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
module.exports = router;
