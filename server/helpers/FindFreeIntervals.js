const { parseTime } = require("./ParseTime");

function findFreeIntervals(eventInstances) {
  let freeIntervals = [];

  const sleepingTime = parseTime(process.env.Sleeping_Time);
  const wakingTime = parseTime(process.env.Waking_Time);

  freeIntervals.push({
    startTime: wakingTime,
    endTime: parseTime(eventInstances[0].Event.startTime),
  });

  for (var i = 1; i < eventInstances.length; i++) {
    let prevEnd = parseTime(eventInstances[i - 1].Event.endTime);
    let currStart = parseTime(eventInstances[i].Event.startTime);
    if (prevEnd < currStart) {
      freeIntervals.push({ startTime: prevEnd, endTime: currStart });
    }
  }

  freeIntervals.push({
    startTime: parseTime(
      eventInstances[eventInstances.length - 1].Event.endTime
    ),
    endTime: sleepingTime,
  });

  return freeIntervals;
}

module.exports = { findFreeIntervals };
