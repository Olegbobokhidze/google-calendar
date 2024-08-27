"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentCalendar } from "@/redux/calendar/calendarSlice";

import { Header } from "./Header";
import { SideCalendar } from "./SideCalendar";

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
      <main className="flex h-[calc(100%_-_3.5rem)] flex-1">
        <div
          className={`mt-[65px] flex flex-col p-5 ${
            isSideCalendar ? "block" : "hidden"
          }`}
        >
          <SideCalendar />
        </div>
      </main>
    </div>
  );
};
