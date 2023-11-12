import { observer } from "mobx-react-lite";
import React from "react";
import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";
import FollowButton from "./FollowButton";

export default observer(function ProfileHeader({ profile }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName}></Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic
              label="Followers"
              value={profile.followersCount}
            ></Statistic>
            <Statistic
              label="Following"
              value={profile.followingCount}
            ></Statistic>
          </Statistic.Group>
          <Divider />
          <FollowButton profile={profile} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
