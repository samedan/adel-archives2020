import React from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventListAttendee({ attendee }) {
  return (
    <List.Item as={Link} to={`/profile/${attendee.id}`}>
      <Image
        size="mini"
        circular
        src={attendee.photoURL || "/assets/user.png"}
        title={attendee.displayName || "Joined attendee"}
      />
    </List.Item>
  );
}
