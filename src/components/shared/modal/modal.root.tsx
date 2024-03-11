import { FC, useCallback, useEffect } from "react";
import styles from "./modal.style.module.scss";
import { useModalAction, useModalStore } from "../../../contexts/modal.provider";

const ModalRootComponent: FC = () => { 
  const modalStore = useModalStore();
  const modalAction = useModalAction();
  const isOpen = modalStore.size > 0;

  const closeAllModals = useCallback(() => {
    modalAction(new Set());
  }, [modalAction]);

  useEffect(() => {
    if(!isOpen) return;

    const keyDown = (e: KeyboardEvent) => {
      if(e.code === "Escape") {
        closeAllModals();
      }
    }
  
    return () => {
      window.addEventListener('keydown', keyDown);
    }
  }, [isOpen, closeAllModals]);
  
  return (
    <>
      <div className={isOpen ? styles.modal : ""}>
        {isOpen && <div className="modal-backdrop" onClick={closeAllModals}></div>}
        <div id="modal-root"></div>
      </div>
    </>
  )
}

export const ModalRoot = ModalRootComponent;