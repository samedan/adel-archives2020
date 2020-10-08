import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "./../../../features/auth/RegisterForm";

export default function ModalManager() {
  // Which type of model we want open
  const modalLookup = { TestModal, LoginForm, RegisterForm };

  // Current modal
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;

  // Look in the stateModal, if there is a Modal passed then
  // get the ModalType to a new Component and pass it the modalProps
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
