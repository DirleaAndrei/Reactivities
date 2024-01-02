import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import ModalContainer from "../common/modals/ModalContainer";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
});
