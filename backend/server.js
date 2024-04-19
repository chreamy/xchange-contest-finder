const express = require("express");
const cors = require("cors");
require("dotenv/config");

const app = express();

const mongoose = require("mongoose");
const port = 3001;
const crawlerRoutes = require("./routes/crawler");

const http = require("http");
const socket = require("./service/socket");
const server = http.createServer(app);
const io = socket(server);

// 全域註冊
app.set('socketio',io);



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
const teamRouter = require("./routes/team");
const formRouter = require("./routes/form");
app.use("/form", formRouter);
app.use("/user", userRouter);
const contestRouter = require("./routes/contest");
app.use("/contest", contestRouter);

app.use("/team", teamRouter);

app.use("/crawler", crawlerRoutes);

app.get('/', (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Backend server is listening at http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`Server and Socket.IO are running on http://localhost:${port}`);
});
