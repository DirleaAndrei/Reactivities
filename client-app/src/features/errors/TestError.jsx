import axios from "axios";
import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import ValidationError from "./ValidationErrors";

export default function TestErrors() {
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get("/buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get("/buggy/bad-request")
      .catch((err) => console.log(err));
  }

  function handleServerError() {
    axios
      .get("/buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorized() {
    axios
      .get("/buggy/unauthorized")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get("/activities/notaguid")
      .catch((err) => console.log(err));
  }

  function handleValidationError() {
    axios.post("/activities", {}).catch((err) => 
    {
      //Validations errors
      if(err.message) setErrors(err.message.split('\n'));
      //Message error
      else setErrors(err);
    });
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorized}
            content="Unauthorized"
            basic
            primary
          />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
        {errors && <ValidationError errors={errors} />}
      </Segment>
    </>
  );
}
