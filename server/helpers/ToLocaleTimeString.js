function toLocaleTimeString(time) {
  return time.toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    seconds: "2-digit",
    hour12: false,
  });
}

module.exports = { toLocaleTimeString };
