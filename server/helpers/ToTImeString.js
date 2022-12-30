function toTimeString(time) {
  let hours = time.getHours() - 7;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

module.exports = { toTimeString };
