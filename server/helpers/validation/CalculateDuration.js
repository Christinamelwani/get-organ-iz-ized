const { parseTime } = require("../ParseTime");
const { toTimeString } = require("../ToTImeString");

function calculateDuration(startTime, endTime) {
  startTime = parseTime(startTime);
  endTime = parseTime(endTime);

  return toTimeString(new Date(endTime - startTime));
}

module.exports = { calculateDuration };
