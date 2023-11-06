import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEdit from "./ProfileEdit";

export default observer(function ProfileAbout({ profile }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          <Button
            floated="right"
            basic
            content={editMode ? "Cancel" : "Edit Profile"}
            onClick={() => setEditMode(!editMode)}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEdit
              profile={profile}
              setEditMode={(b) => setEditMode(b)}
            />
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</p>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
