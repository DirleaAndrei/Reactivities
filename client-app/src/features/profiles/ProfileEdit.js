import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default function ProfileEdit({ profile, setEditMode }) {
  const {
    profileStore: { updateProfile },
    userStore: { setDisplayName },
  } = useStore();

  const validationSchema = new Yup.ObjectSchema({
    displayName: Yup.string().required("Display name is required!"),
  });

  function handleFormSubmit(profile) {
    updateProfile(profile).then(() => {
      setDisplayName(profile.displayName);
      setEditMode(false);
    });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={profile}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput name="displayName" placeholder="Display name" />
          <MyTextArea rows={2} placeholder="Bio" name="bio" />
          <Button
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            floated="right"
            positive
            type="submit"
            content="Update Profile"
          />
        </Form>
      )}
    </Formik>
  );
}
