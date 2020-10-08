import React, { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { clearEvents, fetchEvents } from "./../eventActions";
import EventsFeed from "./EventsFeed";
// import { RETAIN_STATE } from "../eventConstants";

export default function EventDashboard() {
  // pagination
  const limit = 100;
  const dispatch = useDispatch();
  // from store
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then((lastVisible) => {
      setLoadingInitial(false);
    });
    // unmount, reset events
    // return () => {
    //   dispatch(clearEvents());

    // };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  }

  // Custom HOOK
  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  return (
    <Grid
      // columns become rows
      stackable
      // change order in height on mobile
      // reversed="computer"
    >
      <Grid.Column width="6">
        {authenticated && <EventsFeed />}
        <EventFilters loading={loading} />
      </Grid.Column>

      <Grid.Column width="10">
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}

        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
        <Button
          loading={loading}
          disabled={!moreEvents}
          onClick={handleFetchNextEvents}
          color="green"
          content="More..."
          floated="right"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
