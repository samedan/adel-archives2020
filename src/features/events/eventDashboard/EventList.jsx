import React, { useState } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import { setCurrentMonth } from "../eventActions";
import { appendMonth } from "../../../app/common/util/util";

export default function EventList({
  events,
  getNextEvents,
  loading,
  moreEvents,
}) {
  // events.sort((a, b) => b.date < a.date);

  const { currentMonth } = useSelector((state) => state.eventsState);
  const [currMonth, setCurrMonth] = useState(0);

  function displayCurrentItem(event) {
    return (
      <div key={event.id}>
        <p>{event.date.getMonth()}</p>
        <EventListItem
          event={event}
          key={event.id}
          currentMonth={event.date.getMonth()}
        />
      </div>
    );
  }

  // for (let i = 0; i < 12; i++) {
  //   var d = new Date();
  //   console.log(i);
  //   var todaysMonth = d.getMonth() + i;
  //   appendMonth(events)
  //     .reverse()
  //     .map((event) => {
  //       console.log(event);

  //       if (todaysMonth === event.month) {
  //         return (
  //           <div key={event.id}>
  //             <p>{event.month}</p>
  //             <EventListItem
  //               event={event}
  //               key={event.id}
  //               currentMonth={event.date.getMonth()}
  //             />
  //           </div>
  //         );
  //       }
  //     });
  // }

  var d = new Date();
  var todaysMonth = d.getMonth();

  const monthsInYear = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          <h2>{monthsInYear[todaysMonth]}</h2>
          {events.reverse().map((event) => {
            // current month

            if (event.date.getMonth() === todaysMonth) {
              return (
                <div key={event.id}>
                  <p>{todaysMonth}</p>
                  <EventListItem
                    event={event}
                    key={event.id}
                    currentMonth={event.date.getMonth()}
                  />
                </div>
              );
            }
          })}
          <h2>{monthsInYear[todaysMonth - 1]}</h2>
          {events.reverse().map((event) => {
            // current month

            if (event.date.getMonth() === todaysMonth - 1) {
              return (
                <div key={event.id}>
                  <p>{todaysMonth}</p>
                  <EventListItem
                    event={event}
                    key={event.id}
                    currentMonth={event.date.getMonth()}
                  />
                </div>
              );
            }
          })}
          <h2>{monthsInYear[todaysMonth - 2]}</h2>
          {events.reverse().map((event) => {
            // current month

            if (event.date.getMonth() === todaysMonth - 2) {
              return (
                <div key={event.id}>
                  <p>{todaysMonth}</p>
                  <EventListItem
                    event={event}
                    key={event.id}
                    currentMonth={event.date.getMonth()}
                  />
                </div>
              );
            }
          })}
        </InfiniteScroll>
      )}
    </>
  );
}
