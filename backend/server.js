const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
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
app.listen(port, () => {
  console.log(`Backend server is listening at http://localhost:${port}`);
});
