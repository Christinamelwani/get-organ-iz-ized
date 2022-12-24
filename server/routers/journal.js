const express = require("express");
const journalRouter = express.Router();

journalRouter.get("/");
journalRouter.post("/");
journalRouter.put("/:id");

module.exports = journalRouter;
