import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";


type CalendarDateProps = {
  closeModal: () => void;
}

const ModalComponent: FC<PropsWithChildren<CalendarDateProps>> = ({
  closeModal,
  children,
}) => {
  const modalRoot = document.getElementById('modal-root');

  if(!modalRoot) return null;
  return createPortal(
    <>
      <div className="modal-container">
        <div className="modal-head">
          <button type="button" onClick={closeModal} className="close-modal-btn">X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </>,
    modalRoot,
  );
}

export const Modal = ModalComponent;