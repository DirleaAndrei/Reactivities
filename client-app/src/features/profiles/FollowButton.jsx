import { observer } from "mobx-react-lite";
import { Button, Reveal } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function FollowButton({ profile }) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.username === profile.username) return null;

  function handleFollow(e, username) {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }
  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="teal"
          content={profile.following ? "Following" : "Not following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          fluid
          basic
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
          loading={loading}
          onClick={(e) => {
            handleFollow(e, profile.username);
          }}
        />
      </Reveal.Content>
    </Reveal>
  );
});
