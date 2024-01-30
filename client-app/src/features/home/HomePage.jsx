import FacebookLogin from "@greatsumini/react-facebook-login";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content={`Welcome back ${userStore.user.displayName}!`} />
            <Button
              as={Link}
              to="/activities"
              size="huge"
              inverted
              content="Go To Activities!"
            />
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
              content="Login"
            />
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
              content="Register"
            />
            <Divider horizontal inverted>Or</Divider>
            <FacebookLogin
              appId="7120325944728516"
              onSuccess={(response => {
                userStore.facebookLogin(response.accessToken)
              })}
              onFail={response => {console.error("Login error!", response)}}
              className = {`ui button facebook huge inverted ${userStore.fbLoading && 'loading'}`}
            />
          </>
        )}
      </Container>
    </Segment>
  );
});
