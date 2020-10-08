import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "./../../app/common/modals/modalReducer";

export default function UnauthModal({ history, setModalOpen }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleClose() {
    // when we want to stay on the same page 'JOIN THIS EVENT'
    if (!history) {
      setOpen(false);

      setModalOpen(false);
      history.push("/archives");
      return;
    }
    // coming from browsing, memory always last location
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      // coming from outside, link Bookmarked
      history.push("/archives");
    }
    // history.goBack();
    setOpen(false);
  }

  function handleOpenLoginModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    // setModalOpen(false);
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="Connectez-vous pour voir cette page" />
      <Modal.Content>
        <p>Identifiez-vous pour accéder aux Archives</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="Se connecter"
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          {/* <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => handleOpenLoginModal("RegisterForm")}
          /> */}
        </Button.Group>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <p>Ou cliquez sur Annuler pour voir Adelanto.fr</p>
          <Button onClick={handleClose} content="Annuler" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
