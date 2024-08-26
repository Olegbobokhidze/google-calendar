import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/calendarSlice";
import scheduleReducer from "./schedule/scheduleSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
