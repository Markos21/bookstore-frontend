import { useState, useEffect } from "react";

import LoadingSpinner from "../ui/LoadingSpinner";
import Success from "./Success";
import FailedTransaction from "./FailedTransaction";

import { storeOrder } from "../../services/OrderService";

const DispatchCheckout = ({
  userData,
  resetUserData,
  cart,
  resetCart,
  totalCartPrice,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function sumBookQuantities(cart) {
    const totalQuantity = cart.reduce((total, cart) => {
      return total + cart.quantity;
    }, 0);

    return totalQuantity;
  }

  let quantity = sumBookQuantities(cart);

  useEffect(async () => {
    const customer = {
      id: userData.userId,
    };

    try {
      const result = await storeOrder(
        customer,
        cart,
        quantity,
        totalCartPrice,
        userData.address,
        userData.zip,
        userData.city,
        userData.state,
        userData.phoneNumber
      );

      if (result.status == 200) {
        setError(null);
        return;
      } else {
        setError(result.response.data.message);
      }
    } catch (error) {
      setError(error);
      console.log("ERROR IN STROING TRANSACTION", error);
    } finally {
      setLoading(false);
    }

    resetCart();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Processing Transaction..." />;
  }

  if (error) {
    return <FailedTransaction error={error} />;
  }

  return <Success />;
};

export default DispatchCheckout;
