import { format } from "date-fns";

export const getDateString = (date: Date) => {
  return format(date, "MMMM d, yyyy");
};