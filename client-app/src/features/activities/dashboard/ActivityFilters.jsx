import { Header, Menu } from "semantic-ui-react";
import Calender from "react-calendar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 27.5 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All Activities"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I`m going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I`m hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header />
      <Calender
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
      />
    </>
  );
});
