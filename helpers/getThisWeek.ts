import { IDays } from "@/types";

export const getThisWeek = (days: IDays[]): IDays[] => {
  const isThisWeekAndSunday = (element: IDays) =>
    element.isThisWeek && element.dayOfWeek === 0;
  const thisWeekAndSundayIndex = days.findIndex(isThisWeekAndSunday);
  return days.slice(thisWeekAndSundayIndex, thisWeekAndSundayIndex + 7);
};
