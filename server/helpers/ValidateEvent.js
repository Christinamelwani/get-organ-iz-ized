function validateEvent(event) {
  return {
    title: event.title,
    CategoryId: event.CategoryId,
    startTime: event.startTime,
    endTime: event.endTime,
    isRecurring: event.isRecurring,
  };
}

module.exports = { validateEvent };
