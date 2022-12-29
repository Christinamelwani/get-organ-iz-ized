function timeSlotFits(freeIntervalDuration, eventDuration) {
  if (freeIntervalDuration.hours > eventDuration.hours) {
    return true;
  }

  if (
    freeIntervalDuration.hours === eventDuration.hours &&
    freeIntervalDuration.minutes >= eventDuration.minutes
  ) {
    return true;
  }

  if (
    freeIntervalDuration.hours === eventDuration.hours &&
    freeIntervalDuration.minutes === eventDuration.minutes &&
    freeIntervalDuration.seconds >= eventDuration.seconds
  ) {
    return false;
  }

  return false;
}

module.exports = { timeSlotFits };
