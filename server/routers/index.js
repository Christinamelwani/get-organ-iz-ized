const express = require("express");
const eventRouter = require("./event");
const categoryRouter = require("./category");
const journalRouter = require("./journal");

const router = express.Router();
router.use("/categories", categoryRouter);
router.use("/event", eventRouter);
router.use("/journal", journalRouter);

module.exports = router;
