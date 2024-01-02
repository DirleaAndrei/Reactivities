/* eslint-disable react/prop-types */
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

export default function MyTextArea(props) {
  const [field, meta] = useField(props);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
