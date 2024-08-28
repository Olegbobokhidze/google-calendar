"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentCalendar } from "@/redux/calendar/calendarSlice";

import { Header } from "./Header";
import { SideCalendar } from "./SideCalendar";
import { SideCalendarTitle } from "./SideCalendarTitle";
import { AddScheduleButton } from "./AddScheduleButton";
import { AddScheduleModal } from "./AddScheduleDropdown";

export const CalendarWrapper = () => {
  const { year, month, days } = useAppSelector(currentCalendar);
  const [isSideCalendar, setIsSideCalendar] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <Header
        year={year}
        month={month}
        isSideCalendar={isSideCalendar}
        setIsSideCalendar={setIsSideCalendar}
      />
      <main className="flex h-[calc(100%_-_3.5rem)] flex-1">
        <AddScheduleButton
          isSideCalendar={isSideCalendar}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
        <div
          className={`mt-[65px] flex flex-col p-5 ${
            isSideCalendar ? "block" : "hidden"
          }`}
        >
          <SideCalendarTitle year={year} month={month} />
          <SideCalendar days={days} />
        </div>
        <AddScheduleModal
          defaultDate={new Date().toString()}
          timeIndex={0}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      </main>
    </div>
  );
};
