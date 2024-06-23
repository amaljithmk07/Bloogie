const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Registerroutes = require("./routes/Registerroutes");
const loginroutes = require("./routes/Loginroutes");
const blogroutes = require("./routes/Blogroutes");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@cluster0.1oghjkx.mongodb.net/bloogie`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/blog", blogroutes);
server.use("/api/register", Registerroutes);
server.use("/api/login", loginroutes);

const port = 2222;
server.listen(port, () => {
  console.log(`server started ${port}`);
});
