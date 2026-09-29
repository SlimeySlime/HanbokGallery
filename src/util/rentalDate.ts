const koreanDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function getKoreanToday(now: Date = new Date()): string {
  const parts = koreanDateFormatter.formatToParts(now);
  return ['year', 'month', 'day']
    .map(type => parts.find(part => part.type === type)!.value)
    .join('-');
}

/** A selected event date is a calendar date, not an instant to timezone-convert. */
export function getRentalDateRange(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000-')) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;

  // UTC fields are used only for calendar arithmetic; the selected date stays unchanged.
  const start = new Date(date);
  const end = new Date(date);
  start.setUTCDate(start.getUTCDate() - 11);
  end.setUTCDate(end.getUTCDate() + 11);
  if (start.getUTCFullYear() < 1 || end.getUTCFullYear() > 9999) return null;
  return {
    start: start.toISOString().slice(0, 10).replace(/-/g, ''),
    end: end.toISOString().slice(0, 10).replace(/-/g, ''),
    selected: value.replace(/-/g, ''),
  };
}
