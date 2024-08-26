import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {},
  reducers: {},
});

export const {} = calendarSlice.actions;
export const currentCalendar = (state: RootState) => state.calendar.current;

export default calendarSlice.reducer;
