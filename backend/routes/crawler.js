const router = require("express").Router();
const {exec} = require('child_process');

// Define a route for starting the crawler
router.get('/start-crawl', async (req, res) => {
  const command = 'python ./scripts/contest_crawler.py';

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

module.exports = router;