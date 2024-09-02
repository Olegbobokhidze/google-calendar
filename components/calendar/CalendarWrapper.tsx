"use client";

import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { currentCalendar } from "@/redux/calendar/calendarSlice";

import { formatDay, getThisWeek } from "@/helpers";

import { Header } from "./Header";
import { SideCalendar } from "./SideCalendar";
import { SideCalendarTitle } from "./SideCalendarTitle";
import { AddScheduleButton } from "./AddScheduleButton";
import { AddScheduleModal } from "./AddScheduleDropdown";
import { ScheduleCalendar } from "./ScheduleCalendar";

export const CalendarWrapper = () => {
  const { year, month, days } = useAppSelector(currentCalendar);
  const [isSideCalendar, setIsSideCalendar] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<string>(formatDay(new Date()));
  const [timeIndex, setTimeIndex] = useState<number>(0);

  return (
    <div className="bg-white">
      <Header
        year={year}
        month={month}
        isSideCalendar={isSideCalendar}
        setIsSideCalendar={setIsSideCalendar}
      />
      <main className="flex h-[calc(100%_-_3.5rem)] flex-1 flex-col items-start lg:flex-row">
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
          <SideCalendar month={month} year={year} />
        </div>
        <div className="flex h-full w-full flex-1 flex-col overflow-x-scroll pr-2">
          <ScheduleCalendar
            days={getThisWeek(days)}
            setModalDate={setModalDate}
            setTimeIndex={setTimeIndex}
            setIsOpenModal={setIsOpenModal}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
          />
        </div>
        <AddScheduleModal
          month={month}
          year={year}
          defaultDate={modalDate}
          timeIndex={timeIndex}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      </main>
    </div>
  );
};
