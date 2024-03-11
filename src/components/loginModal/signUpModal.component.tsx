import axios, { AxiosError } from "axios";
import { FC, FormEventHandler, PropsWithChildren, useRef } from "react";
import { ModalCommonProps } from "../shared/modal";
import { useLoginAction } from "../../contexts/login.provider";

type loginProps = ModalCommonProps & {
  SignupClose: () => void;
}

const SignUpModalComponent: FC<PropsWithChildren<loginProps>> = ({
  SignupClose,
}) => {
  const inputIdRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);
  const loginAction = useLoginAction();

  const signUp: FormEventHandler<HTMLFormElement> = async (event) => {
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

    axios
    .post('/api/signup', body)
    .then((res) => {
      alert("sing up success");
      SignupClose();
      loginAction(res.data);
    })
    .catch((error: AxiosError) => {
      // (errorResponse.data as { message: string }).message - 한줄사용 / if (axios.isAxiosError<{ message: string }>(error)){내용} - 여러줄 사용 이렇게도 쓸 수 있다고 함. 무슨말인지 확실하지 않음
      // 대충 e가 axiosError이면
      // 그 에러의 response 의 status가 409 이면
      const code = error.response?.status || 500;
      if (code === 409) {
        alert("Username already exists");
        userId.value = '';
        userPw.value = '';
        userId.focus();
        return;
      } else {
        alert("Unknown Error: try again");
      }
    })
  }

  return (
    <div className="Login">
      <div>Sign Up</div>

      <form onSubmit={signUp}>
        <input type="text" placeholder="usename" ref={inputIdRef} autoFocus/>
        <input type="password" placeholder="password" ref={inputPwRef}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export const SignUpModal = SignUpModalComponent;