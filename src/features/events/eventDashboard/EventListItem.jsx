import React, { useState, useEffect } from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Grid,
  Confirm,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link, useHistory } from "react-router-dom";

import { format } from "date-fns";
// import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteEvent, setCurrentMonth } from "../eventActions";

export default function EventListItem({ event }) {
  // console.log(event.hostUid);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { currentUser, authenticated } = useSelector((state) => state.auth);
  const { retainState, currentMonth } = useSelector(
    (state) => state.eventsState
  );
  // redirect to '/'
  const history = useHistory();
  // const {
  //   events,
  //   moreEvents,
  //   filter,
  //   startDate,
  //   lastVisible,
  //   retainState,
  // } = useSelector((state) => state.eventsState);

  const dispatch = useDispatch();

  // Delete the event
  function handleDeleteToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      console.log(event.id);
      dispatch(deleteEvent(event.id));
      // history.push("/events");

      toast.success("Event deleted");
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    setCurrentMonth(event.date.getMonth());
  }, [event]);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          {currentMonth}
          <Item className="event-list-item">
            <Grid>
              {/* <Grid.Column width={5}>
                <Item.Image
                  style={{ margin: 0 }}
                  size="tiny"
                  circular
                  src={event.hostPhotoURL || "/assets/user.png"}
                  title={event.hostedBy}
                />
              </Grid.Column> */}
              <Grid.Column width={16}>
                <Item.Content style={{ margin: 0 }}>
                  <Item.Header
                    content={event.title}
                    className="event-list-item-title"
                  />
                  {/* <Item.Description>
                    Hosted by{" "}
                    <i>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>
                    </i>
                  </Item.Description> */}
                  {event.isCancelled && (
                    <Label
                      style={{ top: "-40px" }}
                      ribbon="right"
                      color="red"
                      content="This event has been cancelled"
                    />
                  )}
                </Item.Content>
              </Grid.Column>
            </Grid>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          {/* <Icon name="clock" /> {event.date} */}
          <div className="event-list-item-date">
            <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
          </div>
          {/* <div className="event-list-item-date">
            <Icon name="marker" /> {event?.venue?.address}
          </div> */}
        </span>
      </Segment>
      {/* <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment> */}
      <Segment clearing>
        <div className="event-list-item-description">{event.description}</div>
        {authenticated && currentUser && event.hostUid === currentUser.uid && (
          <Button
            as={Link}
            to={`/archives/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        )}
        {authenticated && currentUser && event.hostUid === currentUser.uid && (
          <Button
            // onClick={() => deleteEventInFirestore(event.id)}
            color="red"
            floated="right"
            content="Delete"
            loading={loadingCancel}
            onClick={() => setConfirmOpen(true)}
          />
        )}
        <Confirm
          content={
            "selectedEvent?.isCancelled"
              ? "This will delete the event. Are you sure?"
              : "This will cancel the event. Are you sure?"
          }
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => handleDeleteToggle(event)}
        />
      </Segment>
    </Segment.Group>
  );
}
