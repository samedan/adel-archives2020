import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector } from "react-redux";

export default function NavBar({ setFormOpen }) {
  // Get isAuthenticated from STATE (auth)
  const { authenticated } = useSelector((state) => state.auth);

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

        <Menu.Item name="Events" as={NavLink} to="/archives">
          <Icon
            name="calendar alternate outline"
            size="large"
            className="nav-bar-icon"
          />
        </Menu.Item>
        {/* <Menu.Item name="Sandbox" as={NavLink} to="/sandbox" /> */}
        {authenticated ? (
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
