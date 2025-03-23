import { ErrorMessage, Formik } from "formik";
import { toast } from "react-toastify";
import { Button, Form, Grid, GridColumn, Header } from "semantic-ui-react";
import * as Yup from "yup";
import agent from "../../app/api/agent";
import MyTextInput from "../../app/common/form/MyTextInput";
import { router } from "../../app/router/Route";
import useQuery from "../../app/util/hooks";
import ValidationErrors from "../errors/ValidationErrors";

export default function ResetPassword() {
    const email = useQuery().get("email");
    const token = useQuery().get("token");

    return(
        <Formik
        initialValues={{
            password: "",
            confirmPassword: "",
            error: null,
        }}
        onSubmit={(values, { setErrors }) =>
            agent.Account.resetPassword({Token:token, Email:email, Password: values.password})
            .then((response) => {
                toast.success(response);
                router.navigate('/');
            }).catch(error =>
                setErrors({ error: error.message.split('\n') })
            )}
        validationSchema={Yup.object().shape({
            password: Yup.string().required('Password is required'),
            confirmPassword: Yup.string().label('confirm password')
            .required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
        >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
            size="large"
            >
                <Header
                    as="h2"
                    content="Reset your password"
                    color="teal"
                    textAlign="center"
                />
                <Grid columns='three' centered>
                    <GridColumn>
                        <br></br>
                        <h4>Please insert a new password for {email}</h4>
                        <MyTextInput placeholder="Password" name="password" type="password" />
                        <MyTextInput placeholder="Confirm password" name="confirmPassword" type="password" />
                        <ErrorMessage
                            name="error"
                            render={() => <ValidationErrors errors={errors.error} />}
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            positive
                            content="Reset"
                            type="submit"
                            fluid
                        />
                    </GridColumn>
                </Grid>
            </Form>
        )}
        </Formik>
    )
}