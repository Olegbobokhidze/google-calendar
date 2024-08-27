"use client";

import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { selectDay } from "@/redux/calendar/calendarSlice";
import { Calendar } from "@/components/ui/calendar";
import { useAppDispatch } from "@/redux/hooks";

export const SideCalendar = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDayClick: SelectSingleEventHandler = (selectedDate) => {
    dispatch(selectDay(date?.toString() ?? ""));
    setDate(selectedDate);
  };

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        className="rounded-lg border"
      />
    </div>
  );
};
