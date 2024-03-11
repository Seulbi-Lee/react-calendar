import { FC, PropsWithChildren } from "react";
import { MainPage } from "./pages/main.page";
import { ModalProvider } from "./contexts/modal.provider";
import { LoginProvider } from "./contexts/login.provider";
import { Login } from "./components/shared/login";

const RootComponent: FC<PropsWithChildren> = () => {
  return (
    <> 
      <LoginProvider>
        <ModalProvider>
          <Login />
          <MainPage />
        </ModalProvider>
      </LoginProvider>
    </>
  );
};
RootComponent.displayName = "Root";

export const Root = RootComponent;
