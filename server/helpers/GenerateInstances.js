function GenerateInstances(isRecurring, recurringType, newEvent) {
  let day = new Date();
  let repetitions = 30;
  let interval = Number(recurringType?.interval) || 0;

  const instances = [];
  if (!isRecurring) {
    repetitions = 1;
  }

  for (let i = 0; i < repetitions; i++) {
    instances.push({
      date: day,
      EventId: newEvent.id,
    });
    day = new Date(day.getTime() + interval);
  }

  return instances;
}

module.exports = { GenerateInstances };
