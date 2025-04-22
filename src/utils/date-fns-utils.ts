import { 
  format, 
  isToday, 
  isEqual, 
  isBefore, 
  isAfter, 
  differenceInMinutes, 
  getDay, 
  parse, 
  getMonth, 
  getYear, 
  getDaysInMonth, 
  setDate, 
  setMonth, 
  setYear,
  parseISO
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { SHORT_DAYS } from '../constants/Days';

// Common patterns for formatting dates
export const DATE_FORMATS = {
  ISO: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DAY: 'd',
  MONTH_NAME: 'MMMM',
  YEAR: 'yyyy',
};

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

// Equivalent to moment(date1).isSame(date2, 'day')
export const isSameDay = (date1: string | Date, date2: string | Date): boolean => {
  return isEqual(
    new Date(createDate(date1).setHours(0, 0, 0, 0)), 
    new Date(createDate(date2).setHours(0, 0, 0, 0))
  );
};

// Equivalent to moment(date1).diff(date2, 'minutes')
export const diffInMinutes = (date1: string | Date, date2: string | Date): number => {
  return differenceInMinutes(createDate(date1), createDate(date2));
};

// Equivalent to formatDay from utils.ts but using date-fns
export const formatDay = (date: Date | string): string => {
  if (isToday(createDate(date))) {
    return "Dziś";
  }
  return SHORT_DAYS[getDay(createDate(date))];
};

// Equivalent to moment.months()
export const getMonthNames = (): string[] => {
  return Array.from({ length: 12 }, (_, i) => 
    format(new Date(2000, i, 1), 'MMMM', { locale: pl })
  );
};

// Equivalent to moment().date()
export const getDateOfMonth = (date: Date | string): number => {
  return createDate(date).getDate();
};

// Equivalent to moment().day() 
export const getDayOfWeek = (date: Date | string): number => {
  return getDay(createDate(date));
};