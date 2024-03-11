import { DateTime } from "luxon";

const TODO_STORAGE_KEY = "todoData";

const makeDateKey = (dateTime: DateTime): string => dateTime.toFormat("yyyy-MM-dd");

export const setTodoForDate = (dateTime: DateTime, todoList: string[]) => {
  const TodoStorageStr = localStorage.getItem(TODO_STORAGE_KEY);
  if(!TodoStorageStr) {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify({[makeDateKey(dateTime)]: todoList}));
    return;
  }

  const todoData = JSON.parse(TodoStorageStr) as Record<string, string[]>;
  todoData[makeDateKey(dateTime)] = todoList;
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoData));
};

export const getTodoForDate = (dateTime: DateTime): string[] => {
  try {
    const TodoStorageStr = localStorage.getItem(TODO_STORAGE_KEY);
    if(!TodoStorageStr) {
      return [];
    }

    const todoData = JSON.parse(TodoStorageStr) as Record<string, string[]>;
    return todoData[makeDateKey(dateTime)] || [];
  } catch (e) {
    return [];
  }
}


// && : 가장 먼저 보이는 false 값이 나옴. 끝까지 true 면 가장 마지막 값이 나옴
// 6 && 0 && 5  >>>  0 이 나옴. false 값이 나옴
// || : 가장 먼저 보이는 true 값이 나옴. 끝까지 false 면 가징 마지막 값이 나옴
// 0 || 7 || 0  >>>  7 이 나옴. true 값이 나옴
