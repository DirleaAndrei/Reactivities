import { observer } from "mobx-react-lite";
import { Grid, Header, Tab } from "semantic-ui-react";
import ProfileEventsCards from "./ProfileEventsCards";
import { useStore } from "../../app/stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileEvents() {
  const { profileStore } = useStore();
  const { loadingEvents, eventsActiveTab } = profileStore;

  const panes = [
    {
      menuItem: "Future events",
      render: () => <ProfileEventsCards />,
    },
    {
      menuItem: "Past events",
      render: () => <ProfileEventsCards />,
    },
    {
      menuItem: "Hosting",
      render: () => <ProfileEventsCards />,
    },
  ];

  return (
    <Tab.Pane loading={loadingEvents}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="Activities" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            activeIndex={eventsActiveTab}
            onTabChange={(_, data) =>
              profileStore.setEventsActiveTab(data.activeIndex)
            }
          />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
