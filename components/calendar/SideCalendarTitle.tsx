"use client";

import { lastMonth, nextMonth } from "@/redux/calendar/calendarSlice";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { useAppDispatch } from "@/redux/hooks";

type Props = {
  year: number;
  month: number;
};

export const SideCalendarTitle: React.FC<Props> = ({ year, month }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between px-2 pb-2">
      <span>
        {year}წელი {month}თვე
      </span>
    </div>
  );
};
