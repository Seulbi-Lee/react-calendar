import { FC } from "react";
import { useModal } from "../../../hooks/use.modal";
import { LoginModal as LoginModalTemplete, SignUpModal as SignUpModalTemplete } from "../../loginModal";
import { useLoginAction, useLoginStore } from "../../../contexts/login.provider";
import axios from "axios";

const LoginComponent: FC = () => {
  const loginStore = useLoginStore();
  const loginAction = useLoginAction();

  const { Modal: LoginModal, openModal: LoginOpen, closeModal: LoginClose } = useModal(LoginModalTemplete);
  const { Modal: SignUpModal, openModal: SignUpOpen, closeModal: SignupClose } = useModal(SignUpModalTemplete);

  const logoutHandler = () => {
    axios
    .post('/api/logout')
    .then(() => {
      alert("logout");
    })
    .catch((e) => {
      console.log(e);
    })
    loginAction('');
  }
  
  if(loginStore === ''){
    return (
      <>
        <LoginModal loginClose={LoginClose}/>
        <SignUpModal SignupClose={SignupClose}/>
  
        <div className="login">
          <button type="button" onClick={LoginOpen}>login</button>
          <button type="button" onClick={SignUpOpen}>signUp</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="login">
        <p>Hello {loginStore}</p>
        <button type="button" onClick={logoutHandler}>logOut</button>
      </div>
    </>
  )
}

export const Login = LoginComponent;