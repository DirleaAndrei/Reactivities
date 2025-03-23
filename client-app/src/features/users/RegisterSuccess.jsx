import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/util/hooks";

export default function RegisterSuccess() {
  const email = useQuery().get("email");

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resent - please check your email");
      })
      .catch((error) => console.error(error));
  }

  return (
    <Segment placeholder textAlign="center">
      <Header color="green">
        <Icon name="check" />
        Successfully registered!
      </Header>
      <p>
        Please check your email (including junk email) for the verification
        email
      </p>
      {email && (
        <>
          <p>Didn`t receive the email? Click the bellow button to resend</p>
          <Button
            primary
            onClick={handleConfirmEmailResend}
            content="Resend email"
            size="huge"
          />
        </>
      )}
    </Segment>
  );
}
