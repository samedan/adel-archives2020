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
      console.log('!history')
      history.push("/archives");
      return;
    }
    // coming from browsing, memory always last location
    if (history && prevLocation) {
      console.log('history')
      // history.push(prevLocation.pathname);
      history.push("/archives");
    } else {
      console.log('else')
      // coming from outside, link Bookmarked
      history.push("/archives");
    }
    console.log('none')
    // history.goBack();
    setOpen(false);
  }

  function handleOpenLoginModal(modalType) {
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
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          <Button.Or />
          {/* <Button
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
