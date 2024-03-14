const router = require("express").Router();
const Form = require("../schemas/form");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    // get current user from middleware, userData is set in middleware
    const user = req.userData;
    const form = new Form({
      ...req.body,
      userId: user.userId,
    });
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/", authMiddleware, async (req, res) => {
  try {
    const form = await Form.findOne({ userId: req.userData.userId });
    if (!form) {
      return res.status(404).send({ error: "Form not found" });
    }
    form.set(req.body);
    await form.save();
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;