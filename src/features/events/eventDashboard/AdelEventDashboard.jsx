import React, {
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  Header,
  Grid,
  Loader,
  Menu,
  Button,
} from "semantic-ui-react";
import EventList from "./EventList";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

import {
  clearEvents,
  fetchEvents,
  setCurrentLink,
} from "./../eventActions";
import { TestItemRight } from "../../sandbox/TestItemRight";

import { Calendar } from "react-calendar";

export default function AdelEventDashboard() {
  // pagination

  const [
    mapOpen,
    setMapTopggle,
  ] = useState(false);

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
  } = useSelector(
    (state) => state.eventsState
  );
  const { loading } = useSelector(
    (state) => state.async
  );

  const [
    loadingInitial,
    setLoadingInitial,
  ] = useState(false);

  // const [selectedItem, setActiveItem] = useState(activeItem);

  useEffect(() => {
    // if (retainState) return;
    setLoadingInitial(true);
    dispatch(
      fetchEvents(
        filter,
        startDate,
        500
      )
    ).then((lastVisible) => {
      setLoadingInitial(false);
    });
    // unmount, reset events
    return () => {
      dispatch(clearEvents());
      // dispatch({ type: RETAIN_STATE });
    };
  }, [
    dispatch,
    filter,
    startDate,
    retainState,
  ]);

  function handleItemClick(
    e,
    { name }
  ) {
    // setActiveItem(name);
    dispatch(setCurrentLink(name));
    console.log(activeItem);

    // history.push(`/annonces/${activeItem}`);
  }

  function handleFetchNextEvents() {
    dispatch(
      fetchEvents(
        filter,
        startDate,
        limit,
        lastVisible
      )
    );
  }

  // Custom HOOK
  // useFirestoreCollection({
  //   query: () => listenToEventsFromFirestore(predicate),
  //   data: (events) => dispatch(listenToEvents(events)),
  //   deps: [dispatch, predicate],
  // });

  const [
    level1Panels,
    setLevel1Panels,
  ] = useState([]);
  const [
    level2Panels,
    setLevel2Panels,
  ] = useState([]);
  const [
    level3Panels,
    setLevel3Panels,
  ] = useState([]);
  const [
    level4Panels,
    setLevel4Panels,
  ] = useState([]);
  const [
    level5Panels,
    setLevel5Panels,
  ] = useState([]);
  const [
    level6Panels,
    setLevel6Panels,
  ] = useState([]);
  const [
    level7Panels,
    setLevel7Panels,
  ] = useState([]);
  const [
    level8Panels,
    setLevel8Panels,
  ] = useState([]);
  const [
    level9Panels,
    setLevel9Panels,
  ] = useState([]);
  const [
    level10Panels,
    setLevel10Panels,
  ] = useState([]);
  const [
    level11Panels,
    setLevel11Panels,
  ] = useState([]);
  // const level1Panels = [
  //   { key: "panel-1a", title: "Level 1A", content: "Level 1A Contents" },
  //   { key: "panel-ba", title: "Level 1B", content: "Level 1B Contents" },
  // ];
  function makeDafSubMenu(events) {
    let dafArray = [];
    let drhArray = [];
    let dsiArray = [];
    let dmkArray = [];
    let infobtpArray = [];
    let diinfoArray = [];
    let industrieinfoArray = [];
    let itsecurityinfoArray = [];
    let decideurseventsArray = [];
    let prospectionsArray = [];
    let barometresArray = [];

    events.map((e) => {
      switch (e.category) {
        case "daf":
          dafArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "drh":
          drhArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "dsi":
          dsiArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "dmk":
          dmkArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "infobtp":
          infobtpArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "diinfo":
          diinfoArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "industrieinfo":
          industrieinfoArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "itsecurityinfo":
          itsecurityinfoArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "decideursevents":
          decideurseventsArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "prospections":
          prospectionsArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        case "barometres":
          barometresArray.unshift({
            content: e.category,
            title: e.title,
            key: e.id,
          });
          break;
        default:
          break;
      }

      // console.log(e)
    });
    setLevel1Panels(dafArray);
    setLevel2Panels(drhArray);
    setLevel3Panels(dsiArray);
    setLevel4Panels(dmkArray);
    setLevel5Panels(infobtpArray);
    setLevel6Panels(diinfoArray);
    setLevel7Panels(industrieinfoArray);
    setLevel8Panels(
      itsecurityinfoArray
    );
    setLevel9Panels(
      decideurseventsArray
    );
    setLevel10Panels(prospectionsArray);
    setLevel11Panels(barometresArray);
  }

  useEffect(() => {
    if (!loading) {
      makeDafSubMenu(events);
    }
  }, [loading, events]);

  const Level1Content = (
    <div>
      {/* Welcome to level 1 */}

      {/* <div className="accordion ui">
        <div className="title">
          DAf 36
        </div>
        <div className="content">daf</div>
        <div className="title">
          <i aria-hidden="true" className="dropdown icon"></i>some title
        </div>
        <div className="content">daf</div>
      </div> */}
      {/* <Accordion.Accordion panels={level1Panels} /> */}
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level1Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
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
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level2Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level3Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level3Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level4Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level4Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level5Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level5Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level6Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level6Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level7Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level7Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level8Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level8Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level9Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level9Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level10Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level10Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  const Level11Content = (
    <div>
      <Menu
        fluid
        vertical
        tabular
        style={{
          backgroundColor: "#eaeaea",
        }}
      >
        {level11Panels.map((event) => (
          <Menu.Item
            className="title"
            key={event.key}
            name={event.key}
            active={
              activeItem === event.key
            }
            onClick={handleItemClick}
          >
            <i
              aria-hidden="true"
              className="dropdown icon"
            ></i>
            {event.title}
            {/* <NavLink to={`/archives/${event.id}`}>{event.id}</NavLink> */}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  const rootPanels = [
    {
      key: "panel-1",
      title: "DAF",
      content: {
        content: Level1Content,
      },
    },
    {
      key: "panel-2",
      title: "DRH",
      content: {
        content: Level2Content,
      },
    },
    {
      key: "panel-3",
      title: "DSI",
      content: {
        content: Level3Content,
      },
    },
    {
      key: "panel-4",
      title: "DMK",
      content: {
        content: Level4Content,
      },
    },
    {
      key: "panel-5",
      title: "info BTP",
      content: {
        content: Level5Content,
      },
    },
    {
      key: "panel-6",
      title:
        "Directeur Informatique info",
      content: {
        content: Level6Content,
      },
    },
    {
      key: "panel-7",
      title: "Industrie info",
      content: {
        content: Level7Content,
      },
    },
    {
      key: "panel-8",
      title: "IT Security info",
      content: {
        content: Level8Content,
      },
    },
    {
      key: "panel-9",
      title: "Decideurs Events",
      content: {
        content: Level9Content,
      },
    },
    {
      key: "panel-10",
      title: "Prospections",
      content: {
        content: Level10Content,
      },
    },
    {
      key: "panel-11",
      title: "Baromètres",
      content: {
        content: Level11Content,
      },
    },
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
          // default opened menu
          // defaultActiveIndex={}
          as={Menu}
          vertical
          className="stackable 
           mobile hidden
          "
          // mobile
          // hidden
          panels={rootPanels}
          inverted
          styled
          style={{
            backgroundColor: "#222222",
          }}
        />
        <Button
          onClick={() =>
            setMapTopggle(!mapOpen)
          }
          color="teal"
          size="tiny"
          className="mobile only"
        >
          {mapOpen
            ? "Hide menu"
            : "Show menu"}
        </Button>

        {mapOpen && (
          <Accordion
            // default opened menu
            // defaultActiveIndex={}
            as={Menu}
            vertical
            className="stackable 
          
          "
            // mobile
            // hidden
            panels={rootPanels}
            inverted
            styled
            style={{
              backgroundColor:
                "#222222",
            }}
          />
        )}

        {/* <Header icon="calendar" attached color="teal" content="Select date" /> */}
        {/* <Calendar
          // onChange={(date) => dispatch(setStartDate(date))}
          value={startDate || new Date()}
          tileDisabled={() => loading}
        /> */}
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
              getNextEvents={
                handleFetchNextEvents
              }
              loading={loading}
              moreEvents={moreEvents}
            />
            {/* <Button
              loading={loading}
              disabled={!moreEvents}
              onClick={handleFetchNextEvents}
              color="green"
              content="More..."
              floated="right"
            /> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </>
      ) : (
        <>
          <Grid.Column width={12}>
            <TestItemRight
              eventId={activeItem}
            />
          </Grid.Column>
        </>
      )}
    </Grid>
  );
}
