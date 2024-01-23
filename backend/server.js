const express = require("express");
const app = express();
const port = 3001; // Use a different port than your React app

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend server is listening at http://localhost:${port}`);
});
