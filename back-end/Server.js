const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Registerroutes = require("./routes/Registerroutes");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@cluster0.1oghjkx.mongodb.net/bloogie`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((data) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use("/api/register", Registerroutes);

const port = 2222;
server.listen(() => {
  console.log(`server started ${port}`);
});
