const router = require("express").Router();
const Form = require("../schemas/form");
const User = require("../schemas/user");
const authMiddleware = require("../middleware/authMiddleware");

router.patch("/", authMiddleware, async (req, res) => {
  try {
    const form = await Form.findOne({ userId: req.userData.userId });
    if (!form) {
      return res.status(404).send({ error: "Form not found" });
    }
    form.set(req.body);
    await form.save();
    const userForm = await User.fineOne(req.userData.userId);
    if (req.body.identity) userForm.identity = true;

    await userForm.save();
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;