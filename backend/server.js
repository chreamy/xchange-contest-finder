const express = require("express");
const crawlerRoutes = require('./routes/crawler'); // Import the router

const app = express();
const port = 8000; // Use a different port than your React app

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/crawler', crawlerRoutes);

app.listen(port, () => {
  console.log(`Backend server is listening at http://localhost:${port}`);
});
