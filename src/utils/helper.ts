export const calculateDateInGanttChart = (
  startDate?: Date,
  endDate?: Date,
  duration?: number
) => {
  // If change in start date or duration => calculate end date based on start date and duration
  if (!endDate && startDate && duration) {
    let tempDuration = duration;
    const newEndDate = new Date(startDate);

    // Each week, work 5 days, not work 2 days
    const weekCount = Math.floor(tempDuration / 5);
    tempDuration = tempDuration - weekCount * 5;
    newEndDate.setDate(startDate.getDate() + weekCount * 7);

    while (tempDuration > 0) {
      if (![0, 6].includes(newEndDate.getDay())) {
        tempDuration -= 1;
      }
      newEndDate.setDate(newEndDate.getDate() + 1);
    }

    // End date is the end of the last working date. Therefore we need to subtract 1 day
    if (newEndDate.getDay() === 1) {
      newEndDate.setDate(newEndDate.getDate() - 3);
    } else {
      newEndDate.setDate(newEndDate.getDate() - 1);
    }

    return {
      start: startDate,
      end: newEndDate,
      duration: duration,
    };
  }

  if (startDate && endDate && !duration) {
    // If change in end date, keep old start date => calculate duration based on new end date and old start date
    let newDuration = 0; // Remember: Duration is working day, means Monday to Friday
    let diffBetweenStartAndEnd =
      (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
    const dateIterator = new Date(startDate);

    const weekCount = Math.floor(diffBetweenStartAndEnd / 7);
    newDuration += weekCount * 5;
    dateIterator.setDate(dateIterator.getDate() + weekCount * 7);
    diffBetweenStartAndEnd = diffBetweenStartAndEnd - weekCount * 7;

    while (dateIterator.toISOString() !== endDate.toISOString()) {
      if (![0, 6].includes(dateIterator.getDay())) {
        newDuration += 1;
      }
      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    // why +1? Try example
    return {
      start: startDate,
      end: endDate,
      duration: [0, 6].includes(endDate.getDay())
        ? newDuration
        : newDuration + 1,
    };
  }

  return {};
};
