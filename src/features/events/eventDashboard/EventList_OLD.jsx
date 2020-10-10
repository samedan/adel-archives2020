import React, { useState } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import { setCurrentMonth } from "../eventActions";
import { appendMonth } from "../../../app/common/util/util";
import { Container, Grid, Icon, Segment } from "semantic-ui-react";

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

  function shiftMonthAtTheStart(todaysMonth) {
    let shiftedYear = [];
    for (let i=0; i<12; i++) {
      if(i<todaysMonth+1) {
        shiftedYear.unshift(monthsInYear[i]);
      } else {
        shiftedYear[i]= monthsInYear[todaysMonth+12-i];
        
      }
    }
    console.log(shiftedYear);
    return(shiftedYear)
  }

  // shiftMonthAtTheStart(todaysMonth);

  const createdYear = []
  for(let i = 0; i<12; i++) {
    createdYear.push(
      <>
          <Container width={16} >
            <Grid width={16}>
            <Grid.Row width={16}  className="h2-month">
            <h2 className="month"><Icon name='calendar times outline' />{shiftMonthAtTheStart(todaysMonth)[i]}</h2>
            </Grid.Row>
          
          {events.reverse().map((event) => {
            // current month

            if (event.date.getMonth() === monthsInYear.indexOf(shiftMonthAtTheStart(todaysMonth)[i])) {
              return (
                <Grid.Column key={event.id} width={16} style={{width:'100%', backgroundcolor:'red'}}>
                  {/* <p>{todaysMonth}</p> */}
                  
                  <EventListItem
                   
                    event={event}
                    key={event.id}
                    currentMonth={event.date.getMonth()}
                  />
                  
                </Grid.Column>
              );
            }
          })}
          </Grid>
          </Container>
          </>
    )
  }

  // console.log(createdYear)

  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {createdYear}
          <>
          <Container width={16} >
            <Grid width={16}>
            <Grid.Row width={16}  className="h2-month">
            <h2 className="month"><Icon name='calendar times outline' />{shiftMonthAtTheStart(todaysMonth)[0]}</h2>
            </Grid.Row>
          
          {events.reverse().map((event) => {
            // current month

            if (event.date.getMonth() === todaysMonth) {
              return (
                <Grid.Column key={event.id} width={16} style={{width:'100%', backgroundcolor:'red'}}>
                  {/* <p>{todaysMonth}</p> */}
                  
                  <EventListItem
                   
                    event={event}
                    key={event.id}
                    currentMonth={event.date.getMonth()}
                  />
                  
                </Grid.Column>
              );
            }
          })}
          </Grid>
          </Container>
          </>
          
          
        </InfiniteScroll>
      )}
    </>
  );
}
