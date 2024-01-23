/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

export default function ActivityListItem({ activity }) {
  return (
    <>
      <Segment.Group>
        <Segment>
          {activity.isCancelled && (
            <Label
              attached="top"
              color="red"
              content="Cancelled"
              style={{ textAlign: "center" }}
            />
          )}
          <Item.Group>
            <Item>
              <Item.Image
                style={{ marginBottom: 3 }}
                size="tiny"
                circular
                src={activity.host?.image || "/assets/user.png"}
              />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                  {activity.title}
                </Item.Header>
                <Item.Description>
                  Hosted by{" "}
                  <Link to={`/profiles/${activity.hostUsername}`}>
                    {activity.host?.displayName}
                  </Link>
                </Item.Description>
                {activity.isHost && (
                  <Item.Description>
                    <Label basic color="orange">
                      You are hosting the activity!
                    </Label>
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label basic color="green">
                      You are going to this activity!
                    </Label>
                  </Item.Description>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(activity.date, "dd MMM yyyy h:mm aa")}
            <Icon name="marker" /> {activity.venue}
          </span>
        </Segment>
        <Segment secondary>
          <ActivityListItemAttendee attendees={activity.attendees} />
        </Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    </>
  );
}