import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

import { addMonth, addWeek, getCalendar } from "@/helpers";
import { IDays } from "@/types";

type ICurrent = { day: string; days: IDays[]; year: number; month: number };
type ICalendar = {
  select: string;
  current: ICurrent;
};

const today = new Date();
const initCalendar = getCalendar({ select: today, current: today });

const initialState: ICalendar = {
  select: today.toString(),
  current: {
    day: new Date(today).toString(),
    days: initCalendar.days,
    year: initCalendar.year,
    month: initCalendar.month,
  },
};

const createNewDate = ({
  selectDate,
  changeDate,
}: {
  selectDate: string;
  changeDate: string;
}) => {
  return getCalendar({
    select: new Date(selectDate),
    current: new Date(changeDate),
  });
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    nextWeek: (state) => {
      const addWeekDate = addWeek(state.current.day, 1);
      const newDate = createNewDate({
        selectDate: state.select,
        changeDate: addWeekDate,
      });
      state.current = {
        day: addWeekDate,
        ...newDate,
      };
    },
    lastWeek: (state) => {
      const backWeekDate = addWeek(state.current.day, -1);
      console.log(backWeekDate);
      const newDate = createNewDate({
        selectDate: state.select,
        changeDate: backWeekDate,
      });
      state.current = {
        day: backWeekDate,
        ...newDate,
      };
    },
    selectDay: (state, action: PayloadAction<string>) => {
      state.select = action.payload;

      const selectedDate = new Date(action.payload);

      const newDate = createNewDate({
        selectDate: selectedDate.toString(),
        changeDate: selectedDate.toString(),
      });

      state.current = {
        day: selectedDate.toString(),
        days: newDate.days,
        year: newDate.year,
        month: newDate.month,
      };
    },
  },
});

export const { nextWeek, lastWeek, selectDay } = calendarSlice.actions;
export const currentCalendar = (state: RootState) => state.calendar.current;

export default calendarSlice.reducer;
