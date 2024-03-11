import { FC, FormEventHandler, PropsWithChildren, useRef, useState } from "react";
import { ModalCommonProps } from "../shared/modal";
import { DateTime } from "luxon";
import { getTodoForDate, setTodoForDate } from "./todoModalUtils";
import axios from "axios";

type TodoModalProps = ModalCommonProps & {
  dateTime: DateTime;
}

const TodoModalComponent: FC<PropsWithChildren<TodoModalProps>> = ({
  dateTime,
}) => {
  const [todoList, setTodoList] = useState<string[]>(() => getTodoForDate(dateTime));
  const todoInputRef = useRef<HTMLInputElement>(null);

  const createTodo: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const todoInpuElement = todoInputRef.current;
    if(!todoInpuElement) return;

    const newTodo = todoInpuElement.value.trim();
    todoInpuElement.value = "";
    if(!newTodo) return;
    
    setTodoList((prevTodo) => {
      const newTodoList = [...prevTodo, newTodo];
      setTodoForDate(dateTime, newTodoList);
      return [...prevTodo, newTodo];
    });

    const body: any = {
      todo: newTodo,
      date: dateTime.toFormat('yyyy-MM-dd'),
    }

    try {
      await axios
      .post('/api/addTodo', body)
      .then((res) => {
        console.log(res.data)
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  const deleteTodo = (index: number) => {
    const body:any = {
      todo: todoList[index],
      date: dateTime.toFormat('yyyy-MM-dd'),
    }

    axios
    .post("/api/delTodo", body)
    .then(() => {
      console.log("Delete successful")
    }).catch((e) => {
      console.log(e)
    })

    const newTodo = todoList;
    newTodo.splice(index, 1);
    setTodoList(() => {
      setTodoForDate(dateTime, newTodo);
      return [...newTodo];
    });
  }

  return (
    <div>
      {dateTime.toFormat("yyyy-MM-dd")}

      <form onSubmit={createTodo}>
        <input type="text" ref={todoInputRef} autoFocus/>
        <button type="submit">Add</button>
      </form>
      
      <div className="todo-list">
        {todoList.map((todo, index)=> {
          return (
            <div key={index}>
              <span>{todo}</span>
              <button type="button" onClick={()=>deleteTodo(index)}>Del</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const TodoModal = TodoModalComponent;