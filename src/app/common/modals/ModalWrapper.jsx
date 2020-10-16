import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./modalReducer";

export default function ModalWrapper({ children, size, header, icon }) {
  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && header === "Réinitialisez votre mot de passe" && (
        <Modal.Header className="cur">{header}</Modal.Header>
      )}
      {header && header !== "Réinitialisez votre mot de passe" && (
        <Modal.Header className="coi">{header}</Modal.Header>
      )}

      {/* {icon && <Modal.Header>{icon}</Modal.Header>} */}

      {/* Test Modal */}
      {/*   <ModalWrapper size="Mini" header="Test Modal">
              children -->  <div>The data is: {data}</div>
            </ModalWrapper> */}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
