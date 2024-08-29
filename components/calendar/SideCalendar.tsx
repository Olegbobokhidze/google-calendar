"use client";

import { useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import {
  lastMonth,
  nextMonth,
  selectDay,
} from "@/redux/calendar/calendarSlice";

import { IDays } from "@/types";
import { SelectSingleEventHandler } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

type Props = {
  days: IDays[];
};

export const SideCalendar: React.FC<Props> = ({ days }) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date | undefined>(
    new Date(),
  );

  const handleDayClick: SelectSingleEventHandler = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      dispatch(selectDay(selectedDate.toString()));
    }
  };

  const handleMonthChange = (month: Date) => {
    if (currentMonth && month.getMonth() !== currentMonth.getMonth()) {
      if (
        month.getMonth() > currentMonth.getMonth() ||
        (month.getFullYear() > currentMonth.getFullYear() &&
          month.getMonth() === 0)
      ) {
        dispatch(nextMonth());
      } else {
        dispatch(lastMonth());
      }
    }
    setCurrentMonth(month);
  };

  return (
    <div className="p-4">
      <p onClick={() => console.log(days)}>d</p>
      <Calendar
        onMonthChange={handleMonthChange}
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        className="rounded-lg border"
      />
    </div>
  );
};
