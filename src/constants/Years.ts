import moment from "moment";

const currentYear = parseInt(moment().format("YYYY"));

export const getYears = (range: number = 5) => {
  const years = [];

  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  return years;
};
