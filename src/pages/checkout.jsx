import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Container } from "@mui/material";
import CheckoutForm from "../components/form/StripForm";

const stripePromise = loadStripe("pk_test_51NZrH0C0wgKISC6Qdz5K1tfa7ZzPdrOfIS2tiSlIIMF4gyvh53WtJGRc7BepwUxBaaq6RbzMuvQeRUEUfDBzC9IQ00ZpsChaX4");
function Checkout() {
  const options = {
    mode: 'payment',
    payment_method_types: ["card"],
    currency: 'usd',
    amount: 100,
    appearance: {},
  };
  return (
    <Container>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={50} />
      </Elements>
    </Container>
  )
}

export default Checkout