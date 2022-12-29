const { scheduleEvent } = require("./ScheduleEvent");
const { stringToDuration } = require("./scheduling/StringToDuration");

async function validateEvent(event) {
  let { title, CategoryId, startTime, endTime, duration, isRecurring } = event;

  if (duration && !startTime) {
    const durationObj = stringToDuration(duration);
    ({ startTime, endTime } = await scheduleEvent(durationObj));
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
