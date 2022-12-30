function propertiesToTypes(event) {
  return {
    title: event.title,
    CategoryId: Number(event.CategoryId),
    startTime: event.startTime,
    endTime: event.endTime,
    duration: event.duration,
    isRecurring: Boolean(event.isRecurring),
    ReccuringId: Number(event.CategoryId),
  };
}

module.exports = { propertiesToTypes };
