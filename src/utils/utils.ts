import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentDateInPolish = () => {
  const date = new Date();
  const day = date.getDate();

  // Polish month names in lowercase
  const monthsInPolish = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];

  return {
    day,
    month: monthsInPolish[date.getMonth()],
  };
};
