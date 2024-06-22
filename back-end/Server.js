const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const port = 2222;
server.listen(() => {
  console.log(`server started ${port}`);
});
