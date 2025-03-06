import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DAYS } from "../constants/Days";
import { MONTHS_IN_POLISH } from "../constants/Months";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

  if (date.getTime() === new Date().getTime()) {
    return "Czwartek";
  }

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
