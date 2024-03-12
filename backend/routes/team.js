const router = require("express").Router();

let Team = require("../schemas/team");

// create team
router.post("/add", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json(team);
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
router.post("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.body);
    const team = await Team.findOneAndUpdate({ _id: _id }, req.body, {
      upsert: true,
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

// delete a product
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
module.exports = router;
