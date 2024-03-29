const { scheduleEvent } = require("../helpers/scheduling/ScheduleEvent");
const { stringToDuration } = require("../conversion/StringToDuration");
const { calculateDuration } = require("./CalculateDuration");
const { propertiesToTypes } = require("./propertiesToTypes");

async function validateEvent(event) {
  const errors = [];
  const requiredProperties = ["title", "CategoryId"];
  event = propertiesToTypes(event);

  for (const property of requiredProperties) {
    if (!event[property]) {
      errors.push(`${property} is required`);
    }
  }

  if (event.isRecurring && !event.ReccuringId) {
    errors.push("A recurring type is required!");
  }

  if (!event.startTime && !event.duration) {
    errors.push("Either a start time or duration is required!");
  }

  if (!event.startTime && event.isRecurring) {
    errors.push(
      "Automatically scheduled recurring events are not yet supported"
    );
  }

  if (errors.length > 0) {
    throw {
      message: errors.join("\n"),
      status: 400,
    };
  }

  if (event.startTime && event.endTime) {
    event.duration = calculateDuration(event.startTime, event.endTime);
  }

  if (event.duration && !event.startTime) {
    const { startTime, endTime } = await scheduleEvent(
      stringToDuration(event.duration)
    );
    event = {
      ...event,
      startTime,
      endTime,
    };
  }

  return event;
}

module.exports = { validateEvent };
