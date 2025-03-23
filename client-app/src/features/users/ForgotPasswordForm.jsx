import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ForgotPasswordForm() {
  const {userStore} = useStore();

  return (
    <Formik
      initialValues={{ email: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .forgotPassword(values.email)
          .catch(error =>
            {setErrors({ error: error.response.data })}
            )
      }
    >
        {({ handleSubmit, isSubmitting, errors }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header
                as="h2"
                content="Forgot password"
                color="teal"
                textAlign="center"
            />
            <MyTextInput placeholder="Email" name="email" type="email" />
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
                disabled={isSubmitting}
                positive
                content="Reset Password"
                type="submit"
                fluid
            />
            </Form>
        )}
    </Formik>
  );
});
