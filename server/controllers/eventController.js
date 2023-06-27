const { Event, RecurringType, EventInstance } = require("../models");
const { validateEvent } = require("../helpers/ValidateEvent");
const { GenerateInstances } = require("../helpers/instances/GenerateInstances");
const { getEventInstances } = require("../helpers/instances/GetEventInstances");

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
      const newEvent = await validateEvent(req.body);
      newEvent = await Event.create(newEvent);
      if (newEvent.isRecurring) {
        await addRecurringEvent(newEvent);
        return;
      }

      res.status(201).json(newEvent);
    } catch (err) {
      next(err);
    }
  }

  static async addRecurringEvent(req, res) {
    try {
      const newEvent = await validateEvent(req.body);
      newEvent = await Event.create(newEvent);
      const recurringType = await RecurringType.findByPk(req.body.RecurringId);

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
