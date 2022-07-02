const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const memberRouter = require("./routes/member.routes");
const requestMiddleware = require("./middlewares/requests.middlewares");

app.use(requestMiddleware);
app.use("/api/member", memberRouter);
app.get("/", (req, res) => res.send("good job"));

const PORT = 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
