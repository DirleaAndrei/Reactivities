import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import format from "date-fns/format";

export default observer(function ProfileEventsCards() {
  const {
    profileStore: { events, loadEvents, eventsActiveTab },
  } = useStore();

  useEffect(() => {
    if (!events) loadEvents(eventsActiveTab);
  }, [events, loadEvents, eventsActiveTab]);

  return (
    <Grid>
      <Grid.Column>
        <Card.Group itemsPerRow={4}>
          {events.map((event) => (
            <Card as={Link} to={`/activities/${event.activityId}`}>
              <Image
                src={`/assets/categoryImages/${event.category}.jpg`}
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <Card.Content textAlign="center">
                <Card.Header>{event.title}</Card.Header>
                <Card.Description>
                  <div>{format(new Date(event.date), "do LLL")}</div>
                  <div>{format(new Date(event.date), "h:m a")}</div>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
});
