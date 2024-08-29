"use client";

import { useAppDispatch } from "@/redux/hooks";
import { lastWeek, nextWeek, selectDay } from "@/redux/calendar/calendarSlice";

import { IconLeftArrow, IconMenu, IconRightArrow } from "@/components/icons";

type Props = {
  year: number;
  month: number;
  isSideCalendar: boolean;
  setIsSideCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({
  year,
  month,
  isSideCalendar,
  setIsSideCalendar,
}) => {
  const dispatch = useAppDispatch();

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-gray-300 px-2 text-black">
      <div className="flex items-center">
        <div
          className="flex cursor-pointer items-center rounded-full p-2 hover:bg-slate-100"
          onClick={() => setIsSideCalendar(!isSideCalendar)}
        >
          <IconMenu className="size-7" />
        </div>
        <div className="ml-3 flex items-center">
          <h1 className="ml-2 hidden text-lg text-gray-500 md:block">
            კალენდარი
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="mx-3 rounded border border-gray-200 px-3 py-1 text-sm hover:opacity-70"
          onClick={() => dispatch(selectDay(new Date().toString()))}
        >
          დღევანდელი დღე
        </button>

        <div
          className="cursor-pointer hover:opacity-40"
          onClick={() => dispatch(lastWeek())}
        >
          <IconLeftArrow className="size-7" />
        </div>
        <div
          className="cursor-pointer hover:opacity-40"
          onClick={() => dispatch(nextWeek())}
        >
          <IconRightArrow className="size-7" />
        </div>
        <span className="ml-3 text-sm md:text-lg">
          {year}წელი {month}თვე
        </span>
      </div>
    </header>
  );
};
