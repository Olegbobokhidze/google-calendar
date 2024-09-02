import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { addMonth, addWeek, getCalendar } from "@/helpers";
import { IDays } from "@/types";

// Mapping month numbers to Georgian month names
const georgianMonths = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

type ICurrent = { day: string; days: IDays[]; year: number; month: string };
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
    month: georgianMonths[initCalendar.month - 1], // Adjust for zero-based index
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
        month: georgianMonths[newDate.month - 1],
      };
    },
    lastWeek: (state) => {
      const backWeekDate = addWeek(state.current.day, -1);
      const newDate = createNewDate({
        selectDate: state.select,
        changeDate: backWeekDate,
      });
      state.current = {
        day: backWeekDate,
        ...newDate,
        month: georgianMonths[newDate.month - 1],
      };
    },
    nextMonth: (state) => {
      const addMonthDate = addMonth(state.current.day, 1);
      const newDate = createNewDate({
        selectDate: state.select,
        changeDate: addMonthDate,
      });
      state.current = {
        day: addMonthDate,
        ...newDate,
        month: georgianMonths[newDate.month - 1],
      };
    },
    lastMonth: (state) => {
      const backMonthDate = addMonth(state.current.day, -1);
      const newDate = createNewDate({
        selectDate: state.select,
        changeDate: backMonthDate,
      });
      state.current = {
        day: backMonthDate,
        ...newDate,
        month: georgianMonths[newDate.month - 1],
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
        month: georgianMonths[newDate.month - 1],
      };
    },
  },
});

export const { nextWeek, lastWeek, lastMonth, nextMonth, selectDay } =
  calendarSlice.actions;
export const currentCalendar = (state: RootState) => state.calendar.current;

export default calendarSlice.reducer;