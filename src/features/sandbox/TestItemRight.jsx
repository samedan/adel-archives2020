import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Iframe from "react-iframe";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { fetchEvents } from "../events/eventActions";
import { Link, NavLink } from "react-router-dom";

export function TestItemRight({ eventId }) {
  //   console.log(match.params.id);
  const urlId = eventId;
  const { events } = useSelector((state) => state.eventsState);
  const { loading } = useSelector((state) => state.async);

  const dispatch = useDispatch(); 

  // useEffect(() => {
  //   if (events === [] || events === null) {
  //     console.log("empty");
  //     const today = new Date();
  //     dispatch(fetchEvents("all", today, 100));
  //   }
  //   // console.log(match);
  // }, [events]);

  // const { activeItem } = useSelector((state) => state.activeItem);
  // console.log(activeItem);

  function loadEvent(urlId) {
    // if (events === [] || events === undefined) {
    //   console.log("empty");
    //   const today = new Date();
    //   dispatch(fetchEvents("all", today, 100));
    // }
    const el = events.find((event) => event.id === urlId);
    return (
      <>
        <h3>{el?.title}</h3>
        <p>{el?.description}</p>
        <p>
          {
            <a href={el?.url} target="_blank" style={{textDecoration:'underline'}}>
              Ouvrir dans un nouvel onglet
            </a>
          }
        </p>
        <Iframe
          url={el?.url || "https://google.com"}
          width="100%"
          height="900"
          id="myId"
          className="myClassname"
          style={{ width: "100%", height: "100%", minHeight: "600px" }}
          display="initial"
          position="relative"
          // onLoad={this.hideSpinner}
          loading={loading}
        />
      </>
    );
  }

  if (!loading) {
    // return returnEvent(activeItem);
    // setActiveItem(urlId);
    return (
      <>
        <div>{loadEvent(urlId)}</div>
        {/* <p>{urlId}</p> */}
      </>
    );
  } else {
    return <LoadingComponent />;
  }
}
