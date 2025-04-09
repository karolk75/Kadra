import moment from "moment";

export const MONTHS_IN_POLISH = [
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

export const MONTHS_ENGLISH_TO_POLISH = {
  January: "Styczeń",
  February: "Luty",
  March: "Marzec",
  April: "Kwiecień",
  May: "Maj",
  June: "Czerwiec",
  July: "Lipiec",
  August: "Sierpień",
  September: "Wrzesień",
  October: "Październik",
  November: "Listopad",
  December: "Grudzień",
};

export const getMonthInPolish = (month: string) => {
  return MONTHS_ENGLISH_TO_POLISH[
    month as keyof typeof MONTHS_ENGLISH_TO_POLISH
  ];
};

const months = moment.months();

export const getMonthItems = () => {
  const monthItems = months.map((month) => ({
    label: getMonthInPolish(month),
    value: getMonthInPolish(month),
  }));

  return monthItems;
};

export const getMonthNumber = (monthName: string): number | undefined => {
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const index = months.findIndex(
    (m) => m.toLowerCase() === monthName.toLowerCase(),
  );

  return index !== -1 ? index + 1 : undefined;
};
