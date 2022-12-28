const { scheduleEvent } = require("./ScheduleEvent");

async function validateEvent(event) {
  let { title, CategoryId, startTime, endTime, duration, isRecurring } = event;

  if (!startTime) {
    ({ startTime, endTime } = await scheduleEvent(event));
  }

  if (!startTime) {
    throw {
      name: "No available slots! Choose another day to do this!",
    };
  }

  return {
    title,
    CategoryId,
    startTime,
    duration,
    endTime,
    isRecurring,
  };
}

module.exports = { validateEvent };
