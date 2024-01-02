import { useField } from "formik";
import DatePicker from "react-datepicker";
import { Form, Label } from "semantic-ui-react";

export default function MyDateInput(props) {
  const [field, meta, helpers] = useField(props);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
