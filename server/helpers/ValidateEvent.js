const { sub } = require("date-fns");
const { scheduleEvent } = require("./ScheduleEvent");
const { stringToDuration } = require("./StringToDuration");

async function validateEvent(event) {
  let { title, CategoryId, startTime, endTime, duration, isRecurring } = event;

  if (duration && !startTime) {
    const durationObj = stringToDuration(duration);
    ({ startTime, endTime } = await scheduleEvent(durationObj));
  }

  if (!duration && startTime) {
    console.log(sub(new Date(startTime), new Date(endTime)));
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
