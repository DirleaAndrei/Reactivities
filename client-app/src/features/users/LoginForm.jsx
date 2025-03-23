import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ForgotPasswordForm from "./ForgotPasswordForm";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function LoginForm() {
  const { userStore, modalStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(error => {setErrors({ error: error.response.data })}
          )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to activities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
          <br></br>
          <Container textAlign="center">
            <Link onClick={() => modalStore.openModal(<ForgotPasswordForm />)}>
              Forgot Password!
            </Link>
          </Container>
        </Form>
      )}
    </Formik>
  );
});
