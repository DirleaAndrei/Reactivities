import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  if(groupedActivities.length === 0) return <Header color="teal">There are no activities!</Header>

  return (
    <>
      {groupedActivities.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
            {activities.map((activity) => {
              return <ActivityListItem key={activity.id} activity={activity} />;
            })}
          </Fragment>
        );
      })}
    </>
  );
});
