import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ISchedule, IScheduleDetail } from "@/types";

const initialState: ISchedule = {
  "2022-01-01": [
    {
      start: { hour: 1, minute: 20 },
      end: { hour: 1, minute: 40 },
      color: "pink",
      title: "სახელი",
    },
  ],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialState,
  reducers: {
    addSchedule: (
      state,
      action: PayloadAction<{ date: string; data: IScheduleDetail }>,
    ) => {
      if (!state[action.payload.date]) {
        state[action.payload.date] = [];
      }
      state[action.payload.date] = [
        ...state[action.payload.date],
        action.payload.data,
      ];
    },
    removeSchedule: (
      state,
      action: PayloadAction<{ date: string; index: number }>,
    ) => {
      delete state[action.payload.date][action.payload.index];
    },
  },
});

export const { addSchedule, removeSchedule } = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
