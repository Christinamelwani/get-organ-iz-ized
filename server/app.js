const express = require("express");
const cors = require("cors");
const router = require("./routers");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

module.exports = app;