import AddressForm from "../components/Checkout/AddressForm";
import Review from "../components/Checkout/Review";

export default function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}
