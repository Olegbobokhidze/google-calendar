export type IDays = {
  date: number;
  dayOfWeek: number;
  isToday: boolean;
  isSelected: boolean;
  isThisWeek: boolean;
  isThisMonth: boolean;
  day: string;
};

export type IHours = {
  text: string;
  hour: number;
};

export type ITime = { hour: number; minute: number };

export type IRangeColor =
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "brown"
  | "pink";

export type IScheduleDetail = {
  start: ITime;
  end: ITime;
  color: IRangeColor;
  title: string;
};

export type ISchedule = { [key: string]: Array<IScheduleDetail> }