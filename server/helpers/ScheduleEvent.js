const { add, intervalToDuration } = require("date-fns");

const { getEventInstances } = require("./GetEventInstances");

const { findFreeIntervals } = require("./scheduling/FindFreeIntervals");
const { timeSlotFits } = require("./scheduling/TimeSlotFits");
const { toTimeString } = require("./scheduling/ToTimeString");

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
      startTime = toTimeString(freeInterval.startTime);
      endTime = toTimeString(add(freeInterval.startTime, eventDuration));
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
