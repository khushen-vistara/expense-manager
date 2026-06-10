export function formatFriendlyDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  const sameDay = date.toDateString() === today.toDateString();
  if (sameDay) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatMonthLabel(dateString: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function toISODate(date = new Date()) {
  return date.toISOString();
}

export function monthKey(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth()}`;
}

export function getMonthOptions(transactions: { date: string }[]) {
  const seen = new Set<string>();
  return transactions
    .map((item) => item.date)
    .filter((dateString) => {
      const key = monthKey(dateString);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}
