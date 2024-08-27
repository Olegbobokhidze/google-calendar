import { hours24 } from "./hoursADay";

type Props = {
  hour: number;
  minute: string;
  text: string;
};

export const createSelectTimes = (): Array<Props> => {
  const minutes = ["00", "15", "30", "45"];

  const times: Array<Props> = [];
  hours24.forEach((h) => {
    minutes.forEach((m) => {
      times.push({
        hour: h.hour,
        minute: m,
        text: `${h.text}:${m}`,
      });
    });
  });
  return times;
};
