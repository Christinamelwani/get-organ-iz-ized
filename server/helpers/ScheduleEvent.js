const { Event, EventInstance } = require("../models");
const { parse, add, intervalToDuration } = require("date-fns");

function parseTime(time) {
  let formattedTime = parse(time, "HH:mm:ss", new Date());
  return formattedTime;
}

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

function durationFitsInInterval(duration, interval) {
  if (interval.hours < +duration[0]) {
    return false;
  }

  if (interval.minutes < +duration[1]) {
    return false;
  }

  if (interval.seconds < +duration[2]) {
    return false;
  }

  return true;
}

async function scheduleEvent(event) {
  try {
    let date = new Date();
    let startTime = "";
    let endTime = "";

    const eventInstances = await EventInstance.findAll({
      include: Event,
      where: {
        date,
      },
    });

    eventInstances.sort((a, b) => {
      return a.Event.startTime - b.Event.startTime;
    });

    const freeIntervals = findFreeIntervals(eventInstances);

    const duration = event.duration.split(":");

    for (let i = 0; i < freeIntervals.length; i++) {
      // console.log(freeIntervals[i].startTime.toLocaleString());
      // console.log(freeIntervals[i].endTime.toLocaleString());

      const interval = intervalToDuration({
        start: freeIntervals[i].startTime,
        end: freeIntervals[i].endTime,
      });

      if (durationFitsInInterval(duration, interval)) {
        startTime = freeIntervals[i].startTime.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          seconds: "2-digit",
          hour12: false,
        });
        endTime = add(freeIntervals[i].startTime, {
          hours: duration[0],
          minutes: duration[1],
          seconds: duration[2],
        });
        endTime = endTime.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      }
    }
    if (!startTime) {
      console.log("Doesn't fit");
    }
    return { startTime, endTime };
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scheduleEvent };
