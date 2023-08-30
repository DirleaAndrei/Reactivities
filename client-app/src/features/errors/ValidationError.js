import { Message } from "semantic-ui-react";

export default function ValidationError({ errors }) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
