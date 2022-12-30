const express = require("express");
const eventRouter = express.Router();
const EventController = require("../controllers/eventController");

eventRouter.get("/", EventController.getEvents);
eventRouter.post("/", EventController.addEvent);
eventRouter.put("/:id");
eventRouter.delete("/:id");

module.exports = eventRouter;
