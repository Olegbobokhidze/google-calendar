"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentCalendar } from "@/redux/calendar/calendarSlice";

import { Header } from "./Header";

export const CalendarWrapper = () => {
  const { year, month } = useAppSelector(currentCalendar);
  const [isSideCalendar, setIsSideCalendar] = useState<boolean>(true);

  return (
    <div className="bg-white">
      <Header
        year={year}
        month={month}
        isSideCalendar={isSideCalendar}
        setIsSideCalendar={setIsSideCalendar}
      />
    </div>
  );
};
