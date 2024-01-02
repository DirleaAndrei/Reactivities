import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Divider, Icon, Image } from "semantic-ui-react";
import FollowButton from "./FollowButton";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileCard({ profile }) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>
          <p
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {profile.bio}
          </p>
        </Card.Description>
        <Divider />
        <Card.Content extra>
          <Icon name="user" />
          {profile.followersCount} followers
        </Card.Content>
        <FollowButton profile={profile} />
      </Card.Content>
    </Card>
  );
});
