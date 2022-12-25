const { Event, EventInstance } = require("../models");

async function scheduleEvent(duration) {
  let date = new Date();
  const eventInstances = await EventInstance.findAll({
    include: Event,
    where: {
      date,
    },
  });

  let repetitions = 30;
  let interval = Number(recurringType.interval);
  const instances = [];

  if (!isRecurring) {
    repetitions = 1;
  }

  for (let i = 0; i < repetitions; i++) {
    instances.push({
      date: day,
      EventId: newEvent.id,
    });
    day = new Date(day.getTime() + interval);
  }

  return instances;
}

module.exports = { scheduleEvent };
