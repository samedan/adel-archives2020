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

  for (let i = 0; i < 3; i++) {
    events.reverse().map((event) => {
      // current month
      var d = new Date();
      var todaysMonth = d.getMonth();

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
    });
  }
  // return (
  //   <>
  //     {events.length !== 0 && (
  //       <InfiniteScroll
  //         pageStart={0}
  //         loadMore={getNextEvents}
  //         hasMore={!loading && moreEvents}
  //         initialLoad={false}
  //       >

  //         {events.reverse().map((event) => {
  //           // current month
  //           var d = new Date();
  //           var todaysMonth = d.getMonth();

  //           if (event.date.getMonth() === todaysMonth) {
  //             return (
  //               <div key={event.id}>
  //                 <p>{todaysMonth}</p>
  //                 <EventListItem
  //                   event={event}
  //                   key={event.id}
  //                   currentMonth={event.date.getMonth()}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}
  //         {events.reverse().map((event) => {
  //           // current month
  //           var d = new Date();
  //           var todaysMonth = d.getMonth() - 1;

  //           if (event.date.getMonth() === todaysMonth) {
  //             return (
  //               <div key={event.id}>
  //                 <p>{todaysMonth}</p>
  //                 <EventListItem
  //                   event={event}
  //                   key={event.id}
  //                   currentMonth={event.date.getMonth()}
  //                 />
  //               </div>
  //             );
  //           }
  //         })}
  //       </InfiniteScroll>
  //     )}
  //   </>
  // );
}
