const { Event, RecurringType, EventInstance } = require("../models");
const { validateEvent } = require("../helpers/ValidateEvent");
const { GenerateInstances } = require("../helpers/GenerateInstances");
const { scheduleEvent } = require("../helpers/ScheduleEvent");

class EventController {
  static async getEvents(req, res, next) {
    try {
      const date = new Date(req.query.date);
      const eventInstances = await EventInstance.findAll({
        include: Event,
        where: {
          date,
        },
      });
      res.status(200).json({ status: 200, data: eventInstances });
    } catch (err) {
      next(err);
    }
  }

  static async addEvent(req, res, next) {
    try {
      // TODO: add support for duration

      const validatedInput = validateEvent(req.body);
      const { duration } = req.body;
      const { startTime, endTime } = scheduleEvent(duration);

      // const newEvent = await Event.create(validatedInput);

      // const { isRecurring } = req.body;
      // let recurringType = null;

      // if (isRecurring) {
      //   recurringType = await RecurringType.findByPk(req.body.RecurringId);
      // }

      // const instances = GenerateInstances(isRecurring, recurringType, newEvent);
      // const eventInstances = await EventInstance.bulkCreate(instances);

      // res.status(201).json(eventInstances);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
