import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

export default function ProfileCard({ profile }) {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image src={profile.photoURL || "/assets/user.png"} />
      <Card.Content>
        <Card.Header content={profile.displayName} />
      </Card.Content>
    </Card>
  );
}
