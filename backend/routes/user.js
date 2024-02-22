const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "436307408633-hnr8ld1jgqgmbcohbt068jc4hq34bcvb.apps.googleusercontent.com"
);
let User = require("../schemas/user");
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
