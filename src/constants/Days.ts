export const DAYS = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

export const SHORT_DAYS = [
  "Nd",
  "Pn",
  "Wt",
  "Śr",
  "Cz",
  "Pt",
  "Sb",
];

/**
 * Get the index of a day in the week (0-6)
 * @param day Day name or index
 * @returns Index of the day (0 for Monday, 6 for Sunday)
 */
export const getDayIndex = (day: string | number): number => {
  if (typeof day === "number") {
    return day >= 0 && day <= 6 ? day : 0;
  }
  
  const index = DAYS.findIndex(
    (d) => d.toLowerCase() === day.toLowerCase()
  );
  return index !== -1 ? index : 0;
};

/**
 * Get abbreviated day name based on the day of the week (0-6)
 * @param dayOfWeek Day of the week (0 for Monday, 6 for Sunday)
 * @returns Short name of the day
 */
export const getShortDayName = (dayOfWeek: number): string => {
  return SHORT_DAYS[dayOfWeek] || SHORT_DAYS[0];
};
