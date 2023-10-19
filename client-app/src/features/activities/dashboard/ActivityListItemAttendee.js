import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";

export default observer(function ActivityListItemAttendee({ attendees }) {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item
          key={attendee.username}
          as={Link}
          to={`/profile/${attendee.username}`}
        >
          <Image
            size="mini"
            circular
            src={attendee.image || "/assets/user.png"}
          />
        </List.Item>
      ))}
    </List>
  );
});
