import React, { useEffect, useState } from "react";
import { Accordion, Button, Grid, Icon, Loader, Menu } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { clearEvents, fetchEvents, setCurrentLink } from "./../eventActions";
import EventsFeed from "./EventsFeed";
import { RETAIN_STATE } from "../eventConstants";
import TestMenuLeft from "../../sandbox/TestMenuLeft";
import EventDetailedPage from "../eventDetailed/EventDetailedPage";
import { TestItemRight } from "../../sandbox/TestItemRight";
import { NavLink } from "react-router-dom";

export default function AdelEventDashboard() {
  // pagination
  const limit = 2;
  const dispatch = useDispatch();

  // from store
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
    activeItem,
  } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);

  const [loadingInitial, setLoadingInitial] = useState(false);

  // const [selectedItem, setActiveItem] = useState(activeItem);

  useEffect(() => {
    // if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, 100)).then((lastVisible) => {
      setLoadingInitial(false);
    });
    // unmount, reset events
    return () => {
      dispatch(clearEvents());
      // dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleItemClick(e, { name }) {
    // setActiveItem(name);
    dispatch(setCurrentLink(name));
    console.log(activeItem);

    // history.push(`/annonces/${activeItem}`);
  }

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  }

  // Custom HOOK
  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  const [level1Panels, setLevel1Panels] = useState([]);
  const [level2Panels, setLevel2Panels] = useState([]);
  const [level3Panels, setLevel3Panels] = useState([]);
  // const level1Panels = [
  //   { key: "panel-1a", title: "Level 1A", content: "Level 1A Contents" },
  //   { key: "panel-ba", title: "Level 1B", content: "Level 1B Contents" },
  // ];
  function makeDafSubMenu(events) {
    let dafArray = [];
    let drhArray = [];
    let dsiArray = [];

    events.map((e) => {
      switch (e.category) {
        case "daf":
          dafArray.unshift({ content: e.category, title: e.title, key: e.id });
          break;
        case "drk":
          drhArray.unshift({ content: e.category, title: e.title, key: e.id });
          break;
        case "dsi":
          dsiArray.unshift({ content: e.category, title: e.title, key: e.id });
          break;
        default:
          break;
      }

      // console.log(e)
    });
    setLevel1Panels(dafArray);
    setLevel2Panels(drhArray);
    setLevel3Panels(dsiArray);
  }

  useEffect(() => {
    if (!loading) {
      makeDafSubMenu(events);
    }
  }, [loading, events]);

  const Level1Content = (
    <div>
      {/* Welcome to level 1 */}

      {/* <div class="accordion ui">
        <div class="title">
          DAf 36
        </div>
        <div class="content">daf</div>
        <div class="title">
          <i aria-hidden="true" class="dropdown icon"></i>some title
        </div>
        <div class="content">daf</div>
      </div> */}
      {/* <Accordion.Accordion panels={level1Panels} /> */}
      <Menu fluid vertical tabular style={{ backgroundColor: "#eaeaea" }}>
        {level1Panels.map((event) => (
          <Menu.Item
            inverted
            className="title"
            key={event.key}
            name={event.key}
            active={activeItem === event.key}
            onClick={handleItemClick}
          >
            <i aria-hidden="true" class="dropdown icon"></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  // const level2Panels = [
  //   { key: "panel-2a", title: "Level 2A", content: "Level 2A Contents" },
  //   { key: "panel-2b", title: "Level 2B", content: "Level 2B Contents" },
  // ];

  const Level2Content = (
    <div>
      <Menu fluid vertical tabular style={{ backgroundColor: "#eaeaea" }}>
        {level2Panels.map((event) => (
          <Menu.Item
            inverted
            className="title"
            key={event.key}
            name={event.key}
            active={activeItem === event.key}
            onClick={handleItemClick}
          >
            <i aria-hidden="true" class="dropdown icon"></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level3Content = (
    <div>
      <Menu fluid vertical tabular style={{ backgroundColor: "#eaeaea" }}>
        {level3Panels.map((event) => (
          <Menu.Item
            inverted
            className="title"
            key={event.key}
            name={event.key}
            active={activeItem === event.key}
            onClick={handleItemClick}
          >
            <i aria-hidden="true" class="dropdown icon"></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  const rootPanels = [
    { key: "panel-1", title: "DAF", content: { content: Level1Content } },
    { key: "panel-2", title: "DRH", content: { content: Level2Content } },
    { key: "panel-3", title: "DSI", content: { content: Level3Content } },
  ];

  return (
    <Grid
      // columns become rows
      stackable
      // change order in height on mobile
    >
      <Grid.Column width={4}>
        {/* https://react.semantic-ui.com/modules/accordion/#advanced-nested */}

        <Accordion
          defaultActiveIndex={0}
          panels={rootPanels}
          inverted
          styled
          style={{ backgroundColor: "#222222" }}
        />
      </Grid.Column>
      {activeItem === "" ? (
        <>
          <Grid.Column width={12}>
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
        </>
      ) : (
        <>
          <Grid.Column width={10}>
            <TestItemRight eventId={activeItem} />
          </Grid.Column>
        </>
      )}
    </Grid>
  );
}
