const { add, intervalToDuration } = require("date-fns");

const { getEventInstances } = require("../instances/GetEventInstances");

const { findFreeIntervals } = require("./FindFreeIntervals");
const { timeSlotFits } = require("./TimeSlotFits");
const { toLocaleTimeString } = require("../conversion/ToLocaleTimeString");

async function scheduleEvent(eventDuration) {
  let startTime = "";
  let endTime = "";

  const eventInstances = await getEventInstances();
  const freeIntervals = findFreeIntervals(eventInstances);

  for (const freeInterval of freeIntervals) {
    const freeIntervalDuration = intervalToDuration({
      start: freeInterval.startTime,
      end: freeInterval.endTime,
    });

    if (timeSlotFits(freeIntervalDuration, eventDuration)) {
      startTime = toLocaleTimeString(freeInterval.startTime);
      endTime = toLocaleTimeString(add(freeInterval.startTime, eventDuration));
    }
  }

  if (!startTime) {
    throw {
      message: "Event doesn't fit in today's schedule!",
      status: 400,
    };
  }

  return { startTime, endTime };
}

module.exports = { scheduleEvent };
