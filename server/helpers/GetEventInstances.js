const { Event, EventInstance } = require("../models");

async function getEventInstances(date) {
  if (!date) {
    date = new Date().toISOString();
  }

  let eventInstances = await EventInstance.findAll({
    include: Event,
    where: {
      date,
    },
    raw: true,
    nest: true,
    order: [[Event, "startTime", "ASC"]],
  });

  eventInstances = eventInstances.sort((a, b) => {
    return a.Event.startTime - b.Event.startTime;
  });

  return eventInstances;
}

module.exports = { getEventInstances };
