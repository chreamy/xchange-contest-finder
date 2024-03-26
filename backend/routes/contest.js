const express = require("express");
const bodyParser = require("body-parser");
const Contest = require("../schemas/contest");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
router.route("/list").post(async (req, res) => {
  try {
    start = req.body.start || 0;
    end = req.body.end || 20;
    const contests = await Contest.find({}).skip(start).limit(end);
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contests", error: err });
  }
});
router.route("/update-by-json").get(async (req, res) => {
  function toValidDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }
  let contests = require("../../contest_detail.json");
  contests = contests.map((contest) => {
    // Convert date strings to Date objects
    if (contest.startDate) {
      contest.startDate = toValidDate(contest.startDate);
    }

    if (contest.endDate) {
      contest.endDate = toValidDate(contest.endDate);
    }

    // Omit fields with NaN values
    Object.keys(contest).forEach((key) => {
      if (Number.isNaN(contest[key])) {
        delete contest[key];
      }
    });

    return contest;
  });
  try {
    for (const contest of contests) {
      const itemHash = CryptoJS.SHA256(JSON.stringify(contest)).toString();
      const exists = await Contest.findOne({ _hashId: itemHash });
      if (!exists) {
        await Contest.create({ ...contest, _hashId: itemHash });
      }
    }
    res.status(200).send("Items processed");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/clear-all", async (req, res) => {
  try {
    Contest.deleteMany({}).then(() =>
      res.status(200).json({ message: "All contests cleared" })
    );
  } catch (err) {
    res.status(500).json({ message: "Error clearing contests", error: err });
  }
});

router.route("/search").post(async (req, res) => {
  try {
    const start = req.body.start || 0;
    const end = req.body.end || 20;
    if (!req.body.query) {
      res.status(400).json({ message: "Search query required" });
      return;
    }
    const contests = await Contest.aggregate([
      {
        $search: {
          compound: {
            should: [
              {
                text: {
                  query: req.body.query,
                  path: "title",
                  score: { boost: { value: 10 } },
                },
              },
              {
                text: {
                  query: req.body.query,
                  path: "organizer",
                  score: { boost: { value: 4 } },
                },
              },
              {
                text: {
                  query: req.body.query,
                  path: "tags",
                  score: { boost: { value: 7 } },
                },
              },
              {
                text: {
                  query: req.body.query,
                  path: "detail",
                  score: { boost: { value: 1 } },
                },
              },
            ],
          },
        },
      },
      { $skip: start },
      { $limit: end - start },
    ]);
    console.log(contests);
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contests", error: err });
  }
});

router.route("/:id").get(async (req, res) => {
  // get the contests by ID
});
module.exports = router;
