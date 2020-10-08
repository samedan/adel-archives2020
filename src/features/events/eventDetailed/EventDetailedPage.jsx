import React, { useState } from "react";
import { Grid, Menu } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToSelectedEvent } from "./../eventActions";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { NavLink, Redirect } from "react-router-dom";
import Iframe from "react-iframe";
import TestMenuLeft from "../../sandbox/TestMenuLeft";

export default function EventDetailedPage({ match, eventId }) {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector(
    (state) =>
      // state.eventsState.events.find((e) => e.id === match.params.id)
      state.eventsState.selectedEvent
  );
  const { loading, error } = useSelector((state) => state.async);
  // is HOST true or false
  const isHost = event?.hostUid === currentUser?.uid;
  // is currentUser in the attendees list
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  const [activeItem, setActiveItem] = useState("");
  // GET event from firestore
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) {
    return <LoadingComponent content="Loading event..." />;
  }
  if (error) return <Redirect to="/error" />;

  return (
    <Grid
      // columns become rows
      stackable
      // change order in height on mobile
    >
      {/* <Grid.Column width={6}>
        <EventDetailedSidebar
          hostUid={event.hostUid}
          attendees={event?.attendees}
        />
      </Grid.Column> */}
      {/* <Grid.Column width={6}>
        <p>X</p>
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
        </Menu>
      </Grid.Column> */}
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        {/* <EventDetailedInfo event={event} /> */}
        {/* <EventDetailedChat event={event} eventId={event.id} /> */}
        <Iframe
          url={event?.url}
          width="450px"
          height="450px"
          id="myId"
          className="myClassname"
          style={{ width: "100%" }}
          display="initial"
          position="relative"
          // onLoad={this.hideSpinner}
          loading={true}
        />
      </Grid.Column>
    </Grid>
  );
}
