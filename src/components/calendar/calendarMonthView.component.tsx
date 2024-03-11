import { FC, PropsWithChildren, ReactNode } from "react";
import { CalendarDate } from "./calendarDate.component";
import { DateTime } from "luxon";

type CalendarMonthViewProps = {
  year: number;
  month: number;
};

const CalendarMonthViewComponent: FC<
  PropsWithChildren<CalendarMonthViewProps>
> = ({ year, month }) => {
  return (
    <>
      {makeWeekRows(year, month).map((weekRow, week) => (
        <div key={week} className="week-row">
          {weekRow}
        </div>
      ))}
    </>
  );
};
CalendarMonthViewComponent.displayName = "CalendarMonthView";

export const CalendarMonthView = CalendarMonthViewComponent;

function makeWeekRows(year: number, month: number): ReactNode[][] {
  const day1 = DateTime.local(year, month, 1).weekday;
  let date = DateTime.local(year, month, 1).minus({
    days: day1 === 7 ? 0 : day1,
  });

  const weekRows: ReactNode[][] = [];
  let week = 0;
  do {
    weekRows[week] = [];
    for (let i = 0; i < 7; i++) {
      weekRows[week].push(
        <CalendarDate
          key={date.day}
          dateTime={date}
          isCurrMonth={date.month === month}
        />,
      );
      date = date.plus({ day: 1 });
    }
    week++;
  } while (date.month === month);

  return weekRows;
}
