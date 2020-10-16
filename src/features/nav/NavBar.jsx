import React, { useState } from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLink } from "./../events/eventActions";

export default function NavBar({ setFormOpen, history }) {
  // Get isAuthenticated from STATE (auth)
  const { authenticated, activeItem, currentUser } = useSelector(
    (state) => state.auth
  );

  const [inactiveItem, setActiveItem] = useState(activeItem);

  const dispatch = useDispatch();

  function handleLoadEvents() {
    dispatch(setCurrentLink(""));
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          {/* <img  
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          /> */}

          <Icon link name="home" size="large" className="nav-bar-icon" />
          {/* re-Vents */}
        </Menu.Item>

        {authenticated && (
          <Menu.Item
            name="Events"
            onClick={handleLoadEvents}
            // as={NavLink} to="/archives"
          >
            <Button positive inverted>
              {/* <Icon name="plus" /> */}
              <Icon
                name="calendar alternate outline"
                // className="nav-bar-icon"
              />
              <span className="mobile hidden">Tous les evenements</span>
            </Button>
          </Menu.Item>
        )}

        {/* <Menu.Item name="Sandbox" as={NavLink} to="/sandbox" /> */}
        {authenticated && currentUser.uid === "4tVNDDX96HS3T0Hi4Nx0BTjaN7A2" ? (
          <Menu.Item as={NavLink} to="/createevent">
            {/* <Button positive inverted content="Create event" /> */}
            {/* <Icon
              circular
              inverted
              color="yellow"
              positive
              // style={{ color: "#21ba45" }}
              name="plus"
            /> */}

            <Button icon positive inverted>
              {/* <Icon name="plus" /> */}
              Add <br />
              event
            </Button>
          </Menu.Item>
        ) : null}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
