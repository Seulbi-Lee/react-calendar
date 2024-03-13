import { FC, PropsWithChildren, useState } from "react";
import { DateTime } from "luxon";
import { useModal } from "../../hooks/use.modal";
import { TodoModal as TodoModalTemplete } from "../todoModal";
import { getTodoForDate } from "../todoModal/todoModalUtils";
import { useLoginStore } from "../../contexts/login.provider";

type CalendarDateProps = {
  dateTime: DateTime;
  isCurrMonth: boolean;
};

const CalendarDateComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  dateTime,
  isCurrMonth,
}) => {
  const { Modal: TodoModal, openModal } = useModal(TodoModalTemplete);
  const loginStore = useLoginStore();
  const [todoList, setTodoList] = useState<string[]>(() => getTodoForDate(dateTime));

  return(
    <>
      <TodoModal dateTime={dateTime} todoList={todoList} setTodoList={setTodoList}/>

      <div className={cx("date", isCurrMonth ? "" : "out-month")} onClick={openModal}>
        {dateTime.day}
        {loginStore !== '' && todoList.map((todo, index) => {
          return(
            <div key={index}>
              <span>{todo}</span>
            </div>
          )
        })}
      </div>
    </>
  );
};
CalendarDateComponent.displayName = "CalendarDate";

export const CalendarDate = CalendarDateComponent;

function cx(...classnames: string[]): string {
  return [...classnames].filter(Boolean).join(" ");
}
