const express = require("express");
const cors = require("cors");
const crawlerRoutes = require('./routes/crawler'); // Import the router

const app = express();
const port = 8000; // Use a different port than your React app
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const userRouter = require("./routes/user");
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/crawler', crawlerRoutes);
app.listen(port, () => {
  console.log(`Backend server is listening at http://localhost:${port}`);
});
