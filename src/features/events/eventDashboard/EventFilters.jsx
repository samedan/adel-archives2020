import React from "react";
import { Menu, Header } from "semantic-ui-react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import {
  listenToSelectedEvent,
  setFilter,
  setStartDate,
} from "../eventActions";

export default function EventFilters({ loading }) {
  // console.log(setPredicate);

  const dispatch = useDispatch();
  const { filter, startDate } = useSelector((state) => state.eventsState);

  const { authenticated } = useSelector((state) => state.auth);

  return (
    <>
      {authenticated && (
        <Menu vertical size="large" style={{ width: "100%" }}>
          <Header icon="filter" attached color="teal" content="Filters" />
          {/* <Menu.Item
            disabled={loading}
            content="One Event"
            active={filter === "all"}
            onClick={() =>
              dispatch(listenToSelectedEvent({ id: "rIH3NaBP2LUPjpzPHldo" }))
            }
          /> */}
          <Menu.Item
            disabled={loading}
            content="All events"
            active={filter === "all"}
            onClick={() => dispatch(setFilter("all"))}
          />
          <Menu.Item
            disabled={loading}
            content="I'm going"
            active={filter === "isGoing"}
            onClick={() => dispatch(setFilter("isGoing"))}
          />
          <Menu.Item
            disabled={loading}
            content="I'm hosting"
            active={filter === "isHost"}
            onClick={() => dispatch(setFilter("isHost"))}
          />

          <Menu.Item
            disabled={loading}
            content="Past Events"
            active={filter === "pastEvents"}
            onClick={() => dispatch(setFilter("pastEvents"))}
          />
        </Menu>
      )}

      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => dispatch(setStartDate(date))}
        value={startDate || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
