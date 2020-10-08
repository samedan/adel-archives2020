import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Grid, Menu, Segment } from "semantic-ui-react";
import AdelEventDashboard from "../events/eventDashboard/AdelEventDashboard";
import EventList from "../events/eventDashboard/EventList";
import EventDetailedPage from "../events/eventDetailed/EventDetailedPage";
import { TestItemRight } from "./TestItemRight";
import { useHistory } from "react-router-dom";

export default function TestMenuLeft() {
  const [activeItem, setActiveItem] = useState("");
  // state = { activeItem: "bio" };
  const { events } = useSelector((state) => state.eventsState);

  console.log(events);
  const history = useHistory();
  function handleItemClick(e, { name }) {
    setActiveItem(name);
    console.log(activeItem);
    history.push(`/annonces/${activeItem}`);
  }

  // const { activeItem } = this.state;
  // console.log(events);

  return (
    <Grid>
      <Grid.Column>
        <Menu fluid vertical tabular>
          {events.map((event) => (
            <Menu.Item
              key={event.id}
              name={event.id}
              active={activeItem === event.id}
            >
              <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink>
            </Menu.Item>
          ))}
          {/* <Menu.Item
            name="bio"
            active={activeItem === "bio"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="wWzt5Aum07phix9ayhvu"
            active={activeItem === "wWzt5Aum07phix9ayhvu"}
            onClick={handleItemClick}
            // as={Link}
            // to={`/annonces/wWzt5Aum07phix9ayhvu`}
          />
          <Menu.Item
            name="rIH3NaBP2LUPjpzPHldo"
            active={activeItem === "rIH3NaBP2LUPjpzPHldo"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="links"
            active={activeItem === "links"}
            onClick={handleItemClick}
          /> */}
        </Menu>
      </Grid.Column>

      {/* <Grid.Column stretched width={12}>
       
        <Segment>
          {activeItem && activeItem !== "" ? (
            <EventDetailedPage activeItem={activeItem} />
          ) : (
            <AdelEventDashboard />
          )}
        </Segment>
      </Grid.Column> */}
    </Grid>
  );
}
