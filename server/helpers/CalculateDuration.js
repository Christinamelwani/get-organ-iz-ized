const { parseTime } = require("./conversion/ParseTime");
const { toTimeString } = require("./conversion/ToTimeString");

function calculateDuration(startTime, endTime) {
  startTime = parseTime(startTime);
  endTime = parseTime(endTime);

  return toTimeString(new Date(endTime - startTime));
}

module.exports = { calculateDuration };
