import axios from "axios";
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";

const LoginStore = createContext<string | null>(null);
const LoginAction = createContext<Dispatch<SetStateAction<string>> | null>(null);

export const useLoginStore = () => {
  const context = useContext(LoginStore);
  if (context === null) {
    throw new Error ("useLoginStore must be used within a LoginProvider");
  }
  return context;
}

export const useLoginAction = () => {
  const context = useContext(LoginAction);
  if (context === null) {
    throw new Error ("useLoginAction must be used within a LoginProvider");
  }
  return context;
}

const LoginProviderComponent: FC<PropsWithChildren> = ({children}) => {
  const [store, action] = useState('');
  const TODO_STORAGE_KEY = "todoData";

  useEffect (() => {
    axios
    .post("/api/checkCredential")
    .then((res) => {
      action(res.data);
      console.log('checkCredential');
    })
    .catch(() => {
      action('');
    })
  }, []);
  
  useEffect(() => {
    if (store !== ''){
      axios
      .post("/api/getAllTodo")
      .then((res) => {
        const todos: { [key: string]: string[] } = {};
        for (let el of res.data) {
          const prevTodo = todos[el.to_char];
          todos[el.to_char] = prevTodo ? [...prevTodo, el.todo] : [el.todo];
        }
   
        const TodoStorageStr = localStorage.getItem(TODO_STORAGE_KEY);      
        if(!TodoStorageStr) {
          localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
        }
      })
      .catch((e) => {
        console.log(e);
      })
    } else {
      localStorage.removeItem(TODO_STORAGE_KEY);
    }
  }, [store]);
  
  return (
    <>
      <LoginStore.Provider value={store}>
        <LoginAction.Provider value={action}>
          {children}
        </LoginAction.Provider>
      </LoginStore.Provider>
    </>
  )
}

export const LoginProvider = LoginProviderComponent;