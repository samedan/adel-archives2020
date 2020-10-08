import React from "react";
import { Segment, Item, Label, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
      </Segment>
      <Segment attached>
        {/* <Item.Group
          //  relaxed
          // divided
          divided
          relaxed
          stackable
          className="event-detailed-sidebar-sidebar"
        > */}
        <Grid columns={2} doubling stackable>
          {attendees.map((attendee) => (
            <Grid.Column>
              {/* <Segment> */}
              <Item
                as={Link}
                to={`/profile/${attendee.id}`}
                key={attendee.id}
                style={{ position: "relative" }}
                className="event-detailed-sidebar-image"
              >
                {hostUid === attendee.id && (
                  <Label
                    style={{ position: "absolute", zIndex: 1000 }}
                    color="orange"
                    ribbon="right"
                    content="Host"
                  />
                )}
                <Item.Image
                  mobile={3}
                  // size="tiny"
                  size="mini"
                  src={attendee.photoURL || "/assets/user.png"}
                  title={attendee.displayName}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{attendee.displayName}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
              {/* </Segment> */}
            </Grid.Column>
          ))}
        </Grid>
        {/* </Item.Group> */}
      </Segment>
    </>
  );
}
