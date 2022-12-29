function stringToDuration(string) {
  const arr = string.split(":");
  return {
    hours: Number(arr[0]),
    minutes: Number(arr[1]),
    seconds: Number(arr[2]),
  };
}

module.exports = { stringToDuration };
