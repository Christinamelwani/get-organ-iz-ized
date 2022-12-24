const express = require("express");
const eventRouter = express.Router();

eventRouter.get("/");
eventRouter.post("/");
eventRouter.put("/:id");
eventRouter.delete("/:id");

module.exports = eventRouter;
