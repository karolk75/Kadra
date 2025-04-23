import { DAYS, SHORT_DAYS } from "@/constants/Days";
import {
  MONTHS_ENGLISH_TO_POLISH,
  MONTHS_IN_POLISH,
  POLISH_MONTH_NAMES,
  POLISH_MONTH_NAMES_CAPITALIZED,
  POLISH_MONTH_NAMES_LOWERCASE,
} from "@/constants/Months";
import {
  differenceInMinutes,
  format,
  getDay,
  getDaysInMonth,
  getYear,
  isToday as isDateToday,
  isEqual,
  parse,
  parseISO,
} from "date-fns";
import { pl } from "date-fns/locale";

// --------------------------------
// Date Formats
// --------------------------------

// Common patterns for formatting dates
export const DATE_FORMATS = {
  ISO: "yyyy-MM-dd",
  TIME: "HH:mm",
  DAY: "d",
  MONTH_NAME: "MMMM",
  MONTH_NAME_CAPITALIZED: "LLLL", // Capitalized month name
  YEAR: "yyyy",
};

// --------------------------------
// Basic Date Utilities
// --------------------------------

// Helper to create a date safely from various input types
export const createDate = (date: string | Date | null | undefined): Date => {
  if (!date) return new Date();
  if (date instanceof Date) return date;
  return parseISO(date);
};

// Equivalent to moment().format(format)
export const formatDate = (date: string | Date, formatStr: string): string => {
  return format(createDate(date), formatStr, { locale: pl });
};

// Equivalent to moment().utc(false)
// For date-fns, we don't need the utc(false) as it works with local time by default
export const toLocalDate = (date: string | Date): Date => {
  return createDate(date);
};

// --------------------------------
// Date Comparison Utilities
// --------------------------------

// Equivalent to moment(date1).isSame(date2, 'day')
export const isSameDay = (
  date1: string | Date,
  date2: string | Date
): boolean => {
  return isEqual(
    new Date(createDate(date1).setHours(0, 0, 0, 0)),
    new Date(createDate(date2).setHours(0, 0, 0, 0))
  );
};

// Check if date is today
export const isToday = (date: string | Date): boolean => {
  return isDateToday(createDate(date));
};

// Equivalent to moment(date1).diff(date2, 'minutes')
export const diffInMinutes = (
  date1: string | Date,
  date2: string | Date
): number => {
  return differenceInMinutes(createDate(date1), createDate(date2));
};

// --------------------------------
// Day Utilities
// --------------------------------

// Equivalent to formatDay from utils.ts but using date-fns
export const formatDay = (date: Date | string): string => {
  if (isToday(createDate(date))) {
    return "Dziś";
  }
  return SHORT_DAYS[getDay(createDate(date))];
};

// Equivalent to moment().date()
export const getDateOfMonth = (date: Date | string): number => {
  return createDate(date).getDate();
};

// Equivalent to moment().day()
export const getDayOfWeek = (date: Date | string): number => {
  return getDay(createDate(date));
};

// --------------------------------
// Month Utilities
// --------------------------------

// Get Polish month name from English
export const getMonthInPolish = (month: string): string => {
  // First check if it's already a Polish month name
  if (
    POLISH_MONTH_NAMES.includes(month) ||
    POLISH_MONTH_NAMES_CAPITALIZED.includes(month) ||
    MONTHS_IN_POLISH.includes(month)
  ) {
    return month;
  }

  // Then try to translate from English
  return (
    MONTHS_ENGLISH_TO_POLISH[month as keyof typeof MONTHS_ENGLISH_TO_POLISH] ||
    month
  );
};

// Get month number (1-12) from Polish month name (handles different cases and formats)
export const getMonthNumber = (monthName: string): number | undefined => {
  const monthNameLower = monthName.toLowerCase();

  // Check in nominative case
  let index = POLISH_MONTH_NAMES_LOWERCASE.findIndex(
    (m) => m === monthNameLower
  );

  // If not found, check in both genitive and capitalized versions
  if (index === -1) {
    index = MONTHS_IN_POLISH.findIndex(
      (m) => m.toLowerCase() === monthNameLower
    );
  }

  if (index === -1) {
    // Try to match just the beginning of the month name (for flexibility)
    for (let i = 0; i < POLISH_MONTH_NAMES_LOWERCASE.length; i++) {
      if (
        monthNameLower.startsWith(POLISH_MONTH_NAMES_LOWERCASE[i]) ||
        POLISH_MONTH_NAMES_LOWERCASE[i].startsWith(monthNameLower)
      ) {
        return i + 1;
      }
    }

    for (let i = 0; i < MONTHS_IN_POLISH.length; i++) {
      if (
        monthNameLower.startsWith(MONTHS_IN_POLISH[i].toLowerCase()) ||
        MONTHS_IN_POLISH[i].toLowerCase().startsWith(monthNameLower)
      ) {
        return i + 1;
      }
    }
  }

  return index !== -1 ? index + 1 : undefined;
};

// Get month name in the correct format for UI display
export const getDisplayMonthName = (date: Date | string): string => {
  // Get index-based month (0-11)
  const monthIndex = createDate(date).getMonth();

  // Return the nominative case with capital first letter
  return POLISH_MONTH_NAMES[monthIndex];
};

// Equivalent to moment.months()
export const getMonthNames = (): string[] => {
  // Return the UI-friendly month names (nominative case, capital first letter)
  return [...POLISH_MONTH_NAMES];
};

// Get month items for dropdowns/selects (replacing moment-based implementation)
export const getMonthItems = () => {
  return POLISH_MONTH_NAMES.map((month) => ({
    label: month,
    value: month,
  }));
};

// --------------------------------
// Year Utilities
// --------------------------------

// Get current year (replacing moment().format("YYYY"))
export const getCurrentYear = (): number => {
  return getYear(new Date());
};

// Get array of years for dropdowns/selects
export const getYears = (
  range: number = 5
): { label: string; value: string }[] => {
  const currentYear = getCurrentYear();
  const years = [];

  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  return years;
};

// --------------------------------
// Advanced Date Manipulation
// --------------------------------

// Parse a date string with a specific format
export const parseDate = (dateStr: string, formatStr: string): Date => {
  return parse(dateStr, formatStr, new Date());
};

// Get the number of days in a month
export const getDaysInMonthForDate = (date: Date | string): number => {
  return getDaysInMonth(createDate(date));
};

// Create a date with specific year, month, day
export const createSpecificDate = (
  year: number,
  month: number,
  day: number
): Date => {
  return new Date(year, month - 1, day);
};

export const getCurrentDateInPolish = () => {
  const date = new Date();
  const day = date.getDate();

  return {
    day,
    month: MONTHS_IN_POLISH[date.getMonth()],
  };
};

export const formatMessageTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Wczoraj";
  } else if (diffDays < 7) {
    return DAYS[date.getDay()];
  } else {
    return date.toLocaleDateString();
  }
};
