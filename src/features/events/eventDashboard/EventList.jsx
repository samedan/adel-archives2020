import React, { createRef, Fragment, useState } from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import { setCurrentMonth } from "../eventActions";
import { appendMonth } from "../../../app/common/util/util";
import { Button, Container, Grid, Header, Icon, Label, Message, Rail, Ref, Segment, Sticky } from "semantic-ui-react";

export default function EventList({
  events,
  getNextEvents,
  loading,
  moreEvents, 
}) {
  // events.sort((a, b) => b.date < a.date);

  let contextRef = createRef()
  const { currentMonth } = useSelector((state) => state.eventsState);


  var d = new Date();
  var todaysMonth = d.getMonth();
  var todaysYear = d.getFullYear();

  const [currYear, setCurrentYear] = useState(todaysYear);

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

  // creates an Array with the present month at the index 0
  function shiftMonthAtTheStart(todaysMonth, yearChosen = currYear) {
    let shiftedYear = [];
    for (let i=0; i<12; i++) {
      if(i<todaysMonth+1) {
        shiftedYear.unshift({month: monthsInYear[i], year: yearChosen});
      } else {
        shiftedYear[i]= {month:  monthsInYear[todaysMonth+12-i], year: yearChosen-1};
        
      }
    }
    // console.log(shiftedYear);
    // console.log(shiftedYear);
    return(shiftedYear)
  }

  function handleDecreaseYear() {
    setCurrentYear(currYear - 1);
  }
  function handleIncreaseYear() {
    setCurrentYear(currYear + 1);
  }

  
  // console.log(monthsInYear[todaysMonth]);
  // console.log(shiftMonthAtTheStart(todaysMonth)[todaysMonth])
  // const isIndexInShiftedYear = (element) => element = ;
  // console.log(isIndexInShiftedYear);
  // console.log(shiftMonthAtTheStart(todaysMonth).findIndex(isIndexInShiftedYear));
  // console.log(monthsInYear[todaysMonth])

  const createdYear = []
  for(let i = 0; i<12; i++) {
    createdYear.push(
      <Fragment key={i}>
        
          <Container width={16} >
            <Grid width={16}>

            {/* Title of the Month */}
            <Grid.Row width={16}  className="h2-month">
            <div>
              
              <Label  color='red' tag>
              {shiftMonthAtTheStart(todaysMonth)[i].month} - {shiftMonthAtTheStart(todaysMonth, currYear)[i].year} 
              </Label>
              
            </div>
            
            
            </Grid.Row>
          
          {events.reverse().map((event) => {
            
            
            if (
              
              event.date.getMonth() 
              === 
              // the right month
              monthsInYear.indexOf(shiftMonthAtTheStart(todaysMonth)[i].month)
                &&
              event.date.getFullYear() === 
              // the year calculated in the shiftedYear calendar
              shiftMonthAtTheStart(todaysMonth)[i].year
              
              
              ) {
              return (
              
                <Grid.Column key={event.id+i} width={16} style={{width:'100%', backgroundcolor:'red'}}>
                  {/* <p>{todaysMonth}</p> */}
                  {/* <p>{event.date.getFullYear()}</p>     */}
                    
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
          </Fragment>
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
          {/* <Grid centered columns={16}>
        <Grid.Column>
          <Ref innerRef={contextRef} width={16}>
          <Rail position='top'>
            <Sticky> */}
          <Container width={16} className="calendar-title" >
         
            <Grid width={16}>

              <Grid.Column width={1}>

              <Icon
            name="calendar alternate outline"
            size="big"
            // color='green'
            className="calendar-icon"
          />
              </Grid.Column>
              <Grid.Column width={10}>
              Choisissez la période de temps en utilisant les boutons à droite: 
              <br/>
              <span className="calendar-period">{monthsInYear[todaysMonth]} {currYear} - {monthsInYear[todaysMonth+1]} {currYear-1}</span>
              </Grid.Column>
              <Grid.Column align='right' width={5}>
              <Button.Group >
          <Button 
            positive={currYear !== 2014}
            disabled={currYear === 2014}
            onClick={handleDecreaseYear}
            >-12 mois</Button>
            <Button.Or >-</Button.Or>
            <Button 
            positive={currYear !== todaysYear}
            disabled={currYear === todaysYear}
            onClick={handleIncreaseYear}
            >+12 mois</Button>
          </Button.Group>

              </Grid.Column>
            </Grid>
          </Container>
            {/* </Sticky>
            */}
          
          {createdYear}
         
          {/* </Rail>
            </Ref>
            </Grid.Column>
            </Grid> */}
        </InfiniteScroll>
      )}
    </>
  );
}
