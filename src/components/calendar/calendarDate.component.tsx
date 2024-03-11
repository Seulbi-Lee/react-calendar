import { FC, PropsWithChildren } from "react";
import { DateTime } from "luxon";
import { useModal } from "../../hooks/use.modal";
import { TodoModal as TodoModalTemplete } from "../todoModal";

type CalendarDateProps = {
  dateTime: DateTime;
  isCurrMonth: boolean;
};

const CalendarDateComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  dateTime,
  isCurrMonth,
}) => {
  const { Modal: TodoModal, openModal } = useModal(TodoModalTemplete);

  return(
    <>
      <TodoModal dateTime={dateTime} />

      <div className={cx("date", isCurrMonth ? "" : "out-month")} onClick={openModal}>
        {dateTime.day}
      </div>
    </>
  );
};
CalendarDateComponent.displayName = "CalendarDate";

export const CalendarDate = CalendarDateComponent;

function cx(...classnames: string[]): string {
  return [...classnames].filter(Boolean).join(" ");
}
