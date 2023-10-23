import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default observer(function ProfileCard(profile) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description></Card.Description>
        <Card.Content extra>
          <Icon name="user" />
          20 followers
        </Card.Content>
      </Card.Content>
    </Card>
  );
});
