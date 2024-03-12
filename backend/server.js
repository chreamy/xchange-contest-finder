const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();
const mongoose = require("mongoose");
const port = 3001;
const crawlerRoutes = require("./routes/crawler");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo connected!");
});
const userRouter = require("./routes/user");
app.use("/user", userRouter);
const contestRouter = require("./routes/contest");
app.use("/contest", contestRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/crawler", crawlerRoutes);
app.listen(port, () => {
  console.log(`Backend server is listening at http://localhost:${port}`);
});
