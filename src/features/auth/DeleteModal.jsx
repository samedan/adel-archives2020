import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "./../../app/common/modals/modalReducer";

export default function DeleteModal({ history, setModalOpen }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleClose() {
    // when we want to stay on the same page 'JOIN THIS EVENT'
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    // coming from browsing, memory always last location
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      // coming from outside, link Bookmarked
      history.push("/events");
    }
    // history.goBack();
    setOpen(false);
  }

  function handleOpenDeleteModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setModalOpen(false);
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="You need to be signed in to do that" />
      <Modal.Content>
        <p>Please either Login or Register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="Login"
            onClick={() => handleOpenDeleteModal("DeleteForm")}
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
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content="Cancel" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
