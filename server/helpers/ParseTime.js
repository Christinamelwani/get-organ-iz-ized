const { parse } = require("date-fns");

function parseTime(time) {
  return parse(time, "HH:mm:ss", new Date());
}

module.exports = { parseTime };
