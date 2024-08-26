import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {},
  reducers: {},
});

export const {} = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
