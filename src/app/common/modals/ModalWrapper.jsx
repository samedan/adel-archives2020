import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./modalReducer";

export default function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {/* Header for Modal is optional */}
      {header && <Modal.Header>{header}</Modal.Header>}

      {/* Test Modal */}
      {/*   <ModalWrapper size="Mini" header="Test Modal">
              children -->  <div>The data is: {data}</div>
            </ModalWrapper> */}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
