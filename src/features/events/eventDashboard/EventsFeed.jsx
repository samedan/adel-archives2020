import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Feed, Grid, Header, Menu, Segment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/firestore/firebaseService";
import { listenToFeed } from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";
import EventMenuItem from "./EventMenuItem";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("bio");
  const { feed } = useSelector((state) => state.profile);
  const { events } = useSelector((state) => state.eventsState);

  useEffect(() => {
    getUserFeedRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse(); // get the most recent events first
      dispatch(listenToFeed(feed));
    });
    return () => {
      // unsubscribe
      getUserFeedRef().off();
    };
  }, [dispatch]);

  console.log(events);

  //   const image = "/assets/user.png";
  //   const date = "3days ago";
  //   const summary = "Diana joined the event X";

  function handleItemClick({ name }) {
    setActiveItem({ activeItem: name });
  }

  // const { activeItem } = "bio";

  return (
    <>
      <Header
        attached
        color="teal"
        inverted
        icon="newspaper"
        content="News feed"
      />
      <Segment attached="bottom">
        <Feed>
          {feed.map((post) => (
            <EventFeedItem key={post.id} post={post} />
          ))}
          {/* <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} /> */}
          {/* {events.map((event) => (
            <EventMenuItem post={event} as={Link} to={"/events/23"} />
          ))} */}
        </Feed>
      </Segment>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="bio"
              active={activeItem === "bio"}
              onClick={() => handleItemClick()}
            />
            <Menu.Item
              name="pics"
              active={activeItem === "pics"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="companies"
              active={activeItem === "companies"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="links"
              active={activeItem === "links"}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>This {activeItem}</Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}
