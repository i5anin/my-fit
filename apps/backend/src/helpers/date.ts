export function getFirstAndLastWeekDays() {
  const days = [];
  const weeksCount = 5;

  for (let i = 0; i < weeksCount; i++) {
    const today = new Date();

    const firstDay = new Date(
      today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1) - i * 7)
    );

    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    firstDay.setHours(0, 0, 0, 0);
    lastDay.setHours(23, 59, 59);

    days.push({
      dateFrom: firstDay,
      dateTo: lastDay,
      label: `${firstDay.toLocaleDateString('ru').slice(0, -5)} - ${lastDay.toLocaleDateString('ru').slice(0, -5)}`,
    });
  }

  return days.reverse();
}
