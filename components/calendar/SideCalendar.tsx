"use client";

import { useEffect, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import {
  lastMonth,
  nextMonth,
  selectDay,
} from "@/redux/calendar/calendarSlice";

import { SelectSingleEventHandler } from "react-day-picker";

import { convertMonthStringToDate } from "@/helpers";

import { Calendar } from "@/components/ui/calendar";

type Props = {
  month: string;
  year: number;
};

export const SideCalendar: React.FC<Props> = ({ month, year }) => {
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
    if (currentMonth) {
      const currentYear = currentMonth.getFullYear();
      const newYear = month.getFullYear();
      const currentMonthIndex = currentMonth.getMonth();
      const newMonthIndex = month.getMonth();

      if (
        newYear > currentYear ||
        (newYear === currentYear && newMonthIndex > currentMonthIndex)
      ) {
        dispatch(nextMonth());
      } else if (
        newYear < currentYear ||
        (newYear === currentYear && newMonthIndex < currentMonthIndex)
      ) {
        dispatch(lastMonth());
      }
    }

    setCurrentMonth(month);
  };

  useEffect(() => {
    const newMonthDate = convertMonthStringToDate(month, year);
    if (newMonthDate.getTime() !== currentMonth?.getTime()) {
      setCurrentMonth(newMonthDate);
    }
  }, [month, year]);

  return (
    <div className="p-4">
      <Calendar
        onMonthChange={handleMonthChange}
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        month={currentMonth}
        className="rounded-lg border"
      />
    </div>
  );
};
