import React, {
  useState,
  useEffect,
} from "react";
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
import {
  Link,
  NavLink,
  useHistory,
} from "react-router-dom";

import { format } from "date-fns";
// import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { toast } from "react-toastify";
import {
  deleteEvent,
  setCurrentLink,
  setCurrentMonth,
} from "../eventActions";

export default function EventListItem({
  event,
}) {
  // console.log(event)
  const [
    loadingCancel,
    setLoadingCancel,
  ] = useState(false);
  const [
    confirmOpen,
    setConfirmOpen,
  ] = useState(false);

  const {
    currentUser,
    authenticated,
  } = useSelector(
    (state) => state.auth
  );
  const {
    retainState,
    currentMonth,
  } = useSelector(
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

  function handleLoadEvents(id) {
    dispatch(setCurrentLink(id));
  }

  useEffect(() => {
    setCurrentMonth(
      event.date.getMonth()
    );
  }, [event]);

  // categoryOptions = icons
  const colors = [
    { name: "drh", color: "users" },
    {
      name: "dmk",
      color: "lightbulb outline",
    },
    {
      name: "dsi",
      color: "file alternate outline",
    },
    {
      name: "daf",
      color: "chart line",
    },
    {
      name: "prospections",
      color: "search",
    },
    {
      name: "infobtp",
      color: "building outline",
    },
    { name: "diinfo", color: "rss" },
    {
      name: "industrieinfo",
      color: "cogs",
    },
    {
      name: "itsecurityinfo",
      color: "cloud upload",
    },
    {
      name: "decideursevents",
      color: "share square",
    },
    {
      name: "barometres",
      color: "bullhorn",
    },
  ];

  function returnColor(category) {
    //   myArray.find(x => x.id === '45').foo;
    let c = colors.find(
      (x) => x.name === category
    );
    if (c) {
      return c.color;
    }
    return null;
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item className="event-list-item">
            <Grid
              style={{ width: "100%" }}
            >
              <Grid.Column width={10}>
                <Grid
                  style={{
                    width: "100%",
                  }}
                >
                  <Grid.Column
                    width={1}
                  >
                    <Icon
                      className={`category ${event.category}`}
                      name={returnColor(
                        event.category
                      )}
                    />
                  </Grid.Column>
                  <Grid.Column
                    width={14}
                  >
                    <h3
                      className={`category ${event.category}`}
                      onClick={() =>
                        handleLoadEvents(
                          event.id
                        )
                      }
                    >
                      {event.title}
                    </h3>
                  </Grid.Column>
                </Grid>

                {event.isCancelled && (
                  <Label
                    style={{
                      top: "-40px",
                    }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled"
                  />
                )}
              </Grid.Column>

              <Grid.Column
                width={6}
                align="right"
              >
                <Item.Content>
                  <div className="event-list-item-date">
                    <Icon name="clock" />{" "}
                    {format(
                      event.date,
                      "dd/MM/yy"
                    )}
                  </div>
                </Item.Content>
              </Grid.Column>
            </Grid>
          </Item>
        </Item.Group>
      </Segment>

      <Segment clearing>
        <Grid>
          <Grid.Column width={10}>
            <div className="event-list-item-description">
              {event.description}
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            {authenticated &&
              currentUser &&
              currentUser.uid ===
                "4tVNDDX96HS3T0Hi4Nx0BTjaN7A2" && (
                <Button
                  icon
                  as={Link}
                  to={`/archives/${event.id}`}
                  color="orange"
                  floated="right"
                  // content="View"
                >
                  <Icon name="edit" />
                </Button>
              )}

            {authenticated &&
              currentUser &&
              currentUser.uid ===
                "4tVNDDX96HS3T0Hi4Nx0BTjaN7A2" && (
                <Button
                  // onClick={() => deleteEventInFirestore(event.id)}
                  color="red"
                  floated="right"
                  icon
                  loading={
                    loadingCancel
                  }
                  onClick={() =>
                    setConfirmOpen(true)
                  }
                >
                  <Icon name="delete" />
                </Button>
              )}
            {authenticated && (
              <Button
                icon
                floated="right"
                onClick={() =>
                  handleLoadEvents(
                    event.id
                  )
                }
                color="teal"
                // floated="right"
              >
                <Icon name="plus circle" />
              </Button>
            )}
          </Grid.Column>
        </Grid>

        <Confirm
          content={
            "selectedEvent?.isCancelled"
              ? "This will delete the event. Are you sure?"
              : "This will cancel the event. Are you sure?"
          }
          open={confirmOpen}
          onCancel={() =>
            setConfirmOpen(false)
          }
          onConfirm={() =>
            handleDeleteToggle(event)
          }
        />
      </Segment>
    </Segment.Group>
  );
}
