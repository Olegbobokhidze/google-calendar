"use client";

import { useEffect, useState } from "react";

import { removeSchedule, schedules } from "@/redux/schedule/scheduleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { IDays } from "@/types";

import { dayOfWeek, hours24 } from "@/helpers";

type Props = {
  days: IDays[];
  setModalDate: React.Dispatch<React.SetStateAction<string>>;
  setTimeIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScheduleCalendar: React.FC<Props> = ({
  days,
  setModalDate,
  setTimeIndex,
  setIsOpenModal,
  isDeleteOpen,
  setIsDeleteOpen,
}) => {
  const dispatch = useAppDispatch();
  const scheduleData = useAppSelector(schedules);

  const [deleteSchedule, setDeleteSchedule] = useState<{
    date: string;
    index: number;
  }>({
    date: "",
    index: 0,
  });

  const modalHandle = (date: string, hour: number) => {
    setModalDate(date);
    setTimeIndex(hour);
    setIsOpenModal(true);
    setIsDeleteOpen(false);
  };

  const scheduleHandle = (scheduleData: { date: string; index: number }) => {
    setIsOpenModal(false);
    setIsDeleteOpen((prev) => !prev);
    setDeleteSchedule(scheduleData);
  };

  const deleteHandle = () => {
    setIsDeleteOpen(false);
    dispatch(
      removeSchedule({
        date: deleteSchedule.date,
        index: deleteSchedule.index,
      }),
    );
  };

  useEffect(() => {
    if (isDeleteOpen) {
      document.getElementById("schedule")!.style.overflow = "hidden";
    } else {
      document.getElementById("schedule")!.style.overflow = "auto";
    }
  }, [isDeleteOpen]);

  return (
    <>
      <div
        className="mb-2 flex h-[90vh] w-full flex-col overflow-auto"
        id="schedule"
      >
        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-20 flex bg-white">
            <div className="w-[70px] min-w-[70px] bg-white" />
            {days.map((day, index) => (
              <div
                className="z-20 flex min-w-[81px] flex-1 flex-col bg-white pt-4"
                key={day.date}
              >
                <div className="text-center text-sm font-light">
                  {dayOfWeek[index]}
                </div>
                <div className="p-1 text-center text-2xl font-light">
                  <div
                    className={`m-auto flex h-10 w-10 items-center justify-center rounded-full ${day.isToday && "bg-blue-500 text-white"}`}
                  >
                    {day.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1">
            <div className="sticky left-0 top-0 z-10 w-20 min-w-[70px] bg-white">
              {hours24.map((_, index) => {
                const hour = index; // Start from 0:00 (midnight)
                const displayHour = hour === 0 ? 12 : hour; // Handle 0:00 as 12:00
                const period = hour < 12 ? "AM" : "PM"; // AM/PM logic

                return (
                  <div
                    className="h-[60px] pr-2 text-right text-[12px] font-light"
                    key={index}
                  >
                    {displayHour % 24}:00 {period} საათი
                  </div>
                );
              })}
            </div>
            <div className="flex flex-1 pt-2">
              {days.map((day, index) => (
                <div
                  className="relative flex min-w-[81px] flex-1 flex-col"
                  key={`scheduleline-${index}`}
                >
                  {hours24.map((hour, index) => (
                    <div
                      key={`schedule-${index}`}
                      className="h-[60px] cursor-pointer border border-solid border-transparent border-r-zinc-200 border-t-zinc-200 hover:bg-blue-500"
                      onClick={() => modalHandle(day.day, index * 4)}
                    />
                  ))}
                  {scheduleData[day.day] && (
                    <>
                      {scheduleData[day.day].map((s, idx) => {
                        if (!s) return;

                        const t = s.start.hour * 60 + s.start.minute;
                        const top = `${t}px`;
                        let h =
                          (s.end.hour - s.start.hour) * 60 -
                          s.start.minute +
                          s.end.minute;
                        if (h < 20) h = 20;
                        const height = `${h}px`;
                        return (
                          <div
                            key={idx}
                            className="scheduleBox absolute left-0 w-full cursor-pointer overflow-y-auto rounded p-[2px] text-[12px] font-light text-white"
                            style={{
                              top: top,
                              height: height,
                              background: s.color,
                            }}
                            data-schedule={{ date: day.day, index: idx }}
                            onClick={(e) => {
                              scheduleHandle({ date: day.day, index: idx });
                            }}
                          >
                            {s.title}
                            {isDeleteOpen && (
                              <div
                                className="absolute bottom-0 right-0 z-20 cursor-pointer rounded bg-slate-500 px-6 py-2 text-[12px] shadow hover:bg-slate-400"
                                onClick={() => deleteHandle()}
                              >
                                წაშლა
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
