"use client";

import { useEffect, useState } from "react";

import { addSchedule } from "@/redux/schedule/scheduleSlice";
import { useAppDispatch } from "@/redux/hooks";

import { createSelectTimes } from "@/helpers";

import { IRangeColor, IScheduleDetail } from "@/types";

import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface Props {
  defaultDate: string;
  timeIndex: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddScheduleModal: React.FC<Props> = ({
  defaultDate,
  timeIndex,
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useAppDispatch();

  const [isSelectStartTime, setIsSelectStartTime] = useState<boolean>(false);
  const [isSelectEndTime, setIsSelectEndTime] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const [date, setDate] = useState<Date | undefined>(new Date(defaultDate));

  const [color, setColor] = useState<IRangeColor>("red");

  const [startHour, setStartHour] = useState<number>(12);
  const [endHour, setEndHour] = useState<number>(0);

  const [startMinute, setStartMinute] = useState<number>(12);
  const [endMinute, setEndMinute] = useState<number>(0);

  const [startSelectTimeIndex, setStartSelectTimeIndex] = useState<number>(0);
  const [endSelectTimeIndex, setEndSelectTimeIndex] = useState<number>(-1);

  const [displayStartTime, setDisplayStartTime] = useState<string>("");
  const [displayEndTime, setDisplayEndTime] = useState<string>("");

  const selectTimes = createSelectTimes();

  const colors: IRangeColor[] = [
    "red",
    "orange",
    "green",
    "blue",
    "brown",
    "pink",
  ];

  const startTimeChange = (
    hour: number,
    minute: string,
    text: string,
    index: number,
  ) => {
    if (endSelectTimeIndex < index) {
      endTimeChange(hour, minute, text, index);
    }
    setStartSelectTimeIndex(index);
    setIsSelectStartTime(false);
    setDisplayStartTime(text);
    setStartHour(hour);
    setStartMinute(parseInt(minute));
  };

  const endTimeChange = (
    hour: number,
    minute: string,
    text: string,
    index: number,
  ) => {
    setEndSelectTimeIndex(index);
    setIsSelectEndTime(false);
    setDisplayEndTime(text);
    setEndHour(hour);
    setEndMinute(parseInt(minute));
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    setTitle("");

    const schedule: { date: string; data: IScheduleDetail } = {
      date: date?.toISOString().split("T")[0] || defaultDate,
      data: {
        start: { hour: startHour, minute: startMinute },
        end: { hour: endHour, minute: endMinute },
        color,
        title,
      },
    };

    dispatch(addSchedule(schedule));
  };

  useEffect(() => {
    const parsedDate = new Date(defaultDate);
    setDate(parsedDate);
    const defaultTime = selectTimes[timeIndex];
    startTimeChange(
      defaultTime.hour,
      defaultTime.minute,
      defaultTime.text,
      timeIndex,
    );
  }, [defaultDate, timeIndex]);
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } left-8 top-[150px] z-50 m-auto flex w-[350px] flex-col rounded-lg bg-white shadow-2xl`}
    >
      <div className="mb-3 w-full rounded-t-lg bg-gray-100 px-3 py-1">
        <svg
          className="ml-auto cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#222222"
          onClick={() => setIsOpen(false)}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </div>
      <form className="flex w-full flex-col px-5 py-3" onSubmit={submitHandle}>
        <input
          type="text"
          className="w-full border-2 border-solid border-transparent border-b-zinc-200 text-2xl outline-none focus:border-b-blue-500"
          placeholder="სახელი"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="relative mt-3 flex flex-col-reverse items-center text-black">
          <Calendar
            selected={date}
            onSelect={(newDate) => setDate(newDate || new Date())}
            mode="single"
            className="outline-none"
          />
          <div className="flex gap-2">
            <DropdownMenu
              open={isSelectStartTime}
              onOpenChange={setIsSelectStartTime}
            >
              <DropdownMenuTrigger className="cursor-pointer text-black hover:text-black/70">
                {displayStartTime || "Select Start Time"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex h-[180px] w-[180px] flex-col overflow-y-auto rounded-md text-black shadow">
                {selectTimes.map((time, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      startTimeChange(time.hour, time.minute, time.text, index)
                    }
                    className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                  >
                    {time.text}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            -
            <DropdownMenu
              open={isSelectEndTime}
              onOpenChange={setIsSelectEndTime}
            >
              <DropdownMenuTrigger className="cursor-pointer text-black hover:text-black/70">
                {displayEndTime || "Select End Time"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex h-[180px] w-[180px] flex-col overflow-y-auto rounded-md text-black shadow">
                {selectTimes
                  .slice(startSelectTimeIndex + 1)
                  .map((time, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        endTimeChange(
                          time.hour,
                          time.minute,
                          time.text,
                          index + startSelectTimeIndex + 1,
                        )
                      }
                      className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                    >
                      {time.text}
                    </div>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="z-10 mt-5 flex">
          {colors.map((clr) => (
            <div
              key={clr}
              className={`mr-2 h-6 w-6 cursor-pointer rounded-full hover:scale-110 ${
                clr === color ? "scale-125" : ""
              }`}
              style={{ background: clr }}
              onClick={() => setColor(clr)}
            />
          ))}
        </div>
        <div className="mb-3 mt-8 flex w-full">
          <button
            className="ml-auto rounded bg-blue-500 px-5 py-1 text-sm text-white hover:bg-blue-700"
            type="submit"
          >
            დამატება
          </button>
        </div>
      </form>
    </div>
  );
};
