import { IHours } from "@/types";

const create24HoursArray = (): Array<IHours> => {
  const hours: Array<IHours> = [];
  for (let i = 0; i < 12; i++) {
    const hour = i === 0 ? 12 : i;
    const item = { text: `საათი ${hour}`, hour };
    hours.push(item);
  }
  for (let i = 12; i < 24; i++) {
    const item = { text: `საათი ${i}`, hour: i };
    hours.push(item);
  }
  return hours;
};

export const hours24 = create24HoursArray();