import { FC, FormEventHandler, PropsWithChildren, useEffect, useRef } from "react";
import axios from 'axios';
import { ModalCommonProps } from "../shared/modal";
import { useLoginAction } from "../../contexts/login.provider";

type loginProps = ModalCommonProps & {
  loginClose: () => void;
}

const LoginModalComponent: FC<PropsWithChildren<loginProps>> = ({
  loginClose,
}) => {
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);
  const loginAction = useLoginAction();

  // id,pw check
  const loginCheck: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const userId = inputIdRef.current;
    const userPw = inputPwRef.current;

    if (!userId || !userPw) return;

    if (!userId.value) return alert ("enter your ID");
    if (!userPw.value) return alert ("enter your Pw");

    const body: any = {
      username: userId.value,
      password: userPw.value,
    }

    await axios
    .post('/api/login', body)
    .then((res) => {
      loginClose();
      loginAction(res.data);
    })
    .catch((error) => {
      const code = error.response?.status || 500;
      if (code === 401) {
        alert("Wrong username or password");
      } else {
        alert("Unknown Error: try again");
      }
    })
  }

  // // access token 사용자 확인
  // useEffect(() => {
  //   axios
  //   .post('/api/accessToken')
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((e) => console.log());
  // }, []);


  return (
    <div className="login">
      <div>Login</div>

      <form onSubmit={loginCheck}>
        <input type="text" placeholder="ID" ref={inputIdRef} autoFocus/>
        <input type="password" placeholder="PW" ref={inputPwRef}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export const LoginModal = LoginModalComponent;
