import { FC, PropsWithChildren } from "react";
import { DateTime } from "luxon";

type CalendarHeaderProps = {
  year: number;
  month: number;
  goToRelativeMonth: (months: number) => void;
};

const CalendarHeaderComponent: FC<PropsWithChildren<CalendarHeaderProps>> = ({
  year,
  month,
  goToRelativeMonth,
}) => {
  return (
    <>
      <button className="btn btn-left" onClick={() => goToRelativeMonth(-2)}>
        &lt;&lt;
      </button>
      <button className="btn btn-left" onClick={() => goToRelativeMonth(-1)}>
        &lt;
      </button>
      <h1 className="month-display">
        {DateTime.local(year, month).toFormat("MMM yyyy")}
      </h1>
      <button className="btn btn-right" onClick={() => goToRelativeMonth(1)}>
        &gt;
      </button>
      <button className="btn btn-right" onClick={() => goToRelativeMonth(2)}>
        &gt;&gt;
      </button>
    </>
  );
};
CalendarHeaderComponent.displayName = "CalendarHeader";

export const CalendarHeader = CalendarHeaderComponent;
