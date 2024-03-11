import { FC, PropsWithChildren, useCallback, useId } from "react";
import { useModalAction, useModalStore } from "../contexts/modal.provider";
import { Modal, ModalCommonProps } from "../components/shared/modal";

const useModalComponent = <T extends ModalCommonProps,>(
  Templete?: FC<PropsWithChildren<T>>,): {    // Templete을 component로 받을 수 있음/ ?: 비워놔도됨
    Modal: FC<PropsWithChildren<Omit<T, "closeModal">>>;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  } => {
  const modalStore = useModalStore();
  const modalAction = useModalAction();
  const modalId = useId();
  const isOpen = modalStore.has(modalId);

  const openModal = useCallback(() => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.add(modalId);

      return nextSet;
    });
  }, [modalAction, modalId]);
  
  const closeModal = useCallback(() => {
    modalAction((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.delete(modalId);

      return nextSet;
    });
  }, [modalAction, modalId]);

  const modalComponent: FC<PropsWithChildren<any>> = useCallback(({children, ...restprops}) => {
    if(!isOpen) return null;

    if(!Templete) {
      return (
        <Modal closeModal={closeModal}>
          {children}
        </Modal>
      );
    }

    return (
      <Modal closeModal={closeModal}>
        <Templete closeModal={closeModal} {...restprops}>
          {children}
        </Templete>
      </Modal>
    )
  }, [Templete, closeModal, isOpen]);

  return {
    Modal: modalComponent,
    openModal,
    closeModal,
    isOpen,
  }
}

export const useModal = useModalComponent;