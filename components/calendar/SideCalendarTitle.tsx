type Props = {
  year: number;
  month: string;
};

export const SideCalendarTitle: React.FC<Props> = ({ year, month }) => {
  return (
    <div className="flex items-center justify-between px-2 pb-2">
      <span>
        {year} წელი {month}
      </span>
    </div>
  );
};
