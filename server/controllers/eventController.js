const { Event, RecurringType, EventInstance } = require("../models");
const { validateEvent } = require("../validation/ValidateEvent");
const { GenerateInstances } = require("../helpers/GenerateInstances");
const { getEventInstances } = require("../helpers/GetEventInstances");

class EventController {
  static async getEvents(req, res, next) {
    try {
      const eventInstances = await getEventInstances(req.query.date);
      res.status(200).json({ status: 200, data: eventInstances });
    } catch (err) {
      next(err);
    }
  }

  static async addEvent(req, res, next) {
    try {
      let newEvent = await validateEvent(req.body);
      newEvent = await Event.create(newEvent);

      let recurringType = null;
      if (newEvent.isRecurring) {
        recurringType = await RecurringType.findByPk(req.body.RecurringId);
      }

      const instances = GenerateInstances(
        newEvent.isRecurring,
        recurringType,
        newEvent
      );

      const eventInstances = await EventInstance.bulkCreate(instances);

      res.status(201).json(eventInstances);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
