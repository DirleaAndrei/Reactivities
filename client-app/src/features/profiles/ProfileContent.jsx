import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";
import { useStore } from "../../app/stores/store";
import ProfileEvents from "./ProfileEvents";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileContent({ profile }) {
  const { profileStore } = useStore();
  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout profile={profile} />,
    },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents profile={profile} /> },
    {
      menuItem: "Followers",
      render: () => (
        <Tab.Pane>
          <ProfileFollowings />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <Tab.Pane>
          <ProfileFollowings />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
});
