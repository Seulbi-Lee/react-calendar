import { createContext, useState, FC, PropsWithChildren, SetStateAction, Dispatch, useContext } from "react";
import { ModalRoot } from "../components/shared/modal";

const ModalStore = createContext<Set<any> | undefined>(undefined);
const ModalAction = createContext<Dispatch<SetStateAction<Set<any>>> | undefined>(undefined);

export const useModalStore = () => {
  const context = useContext(ModalStore);
  if (context === undefined) {
    throw new Error ("useModalIsOepn must be used within a ModalProvider");
  }
  return context;
}

export const useModalAction = () => {
  const context = useContext(ModalAction);
  if (context === undefined) {
    throw new Error ("useModalIsOepn must be used within a ModalProvider");
  }
  return context;
}

const ModalProviderComponent: FC<PropsWithChildren> = ({children}) => {
  const [store, action] = useState(new Set());

  return (
    <>
      <ModalStore.Provider value={store}>
        <ModalAction.Provider value={action}>
          {children}
          <ModalRoot />
        </ModalAction.Provider>
      </ModalStore.Provider>
    </>
  );
}

export const ModalProvider = ModalProviderComponent;

