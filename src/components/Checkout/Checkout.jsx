import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

import DispatchCheckout from "./DispatchCheckout";

import getStepContent from "../../helpers/getStepContent";
import validateAddressForm from "../../helpers/validateAddressForm";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SuccessSnackbar from "../ui/SuccessSnackbar";

const steps = ["Shipping Address", "Data Check"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userData, setErrors, resetUserData, setUserData } =
    useContext(UserContext);
  const { cart, resetCart, totalCartPrice, amountOfItemsInCart } =
    useContext(CartContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severityStatus, setSeverityStatus] = useState("success");

  useEffect(() => {
    if (!userData || Object.values(userData).some((value) => value == "")) {
      setSeverityStatus("error");
      setSnackbarMessage("Please Login First");
      setShowSnackbar(true);
      <Navigate to="/auth" />;
      return;
    }

    // Fetch userData from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData);
  }, []);

  useEffect(() => {
    if (showSnackbar) {
      // Hide the snackbar after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      // Clear the timeout when the component unmounts or when showSnackbar changes
      return () => clearTimeout(timeoutId);
    }
  }, [showSnackbar]);

  if (amountOfItemsInCart() === 0 && activeStep !== steps.length) {
    return <Navigate to="/" />;
  }

  const handleNext = () => {
    const formIsValid =
      activeStep === 0
        ? validateAddressForm(userData, setErrors)
        : setActiveStep(activeStep + 1);

    if (formIsValid) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        className="animate__animated animate__fadeIn"
      >
        <Paper
          sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          elevation={12}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>

          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5, display: { xs: "none", sm: "flex" } }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <DispatchCheckout
                userData={userData}
                resetUserData={resetUserData}
                cart={cart}
                resetCart={resetCart}
                totalCartPrice={totalCartPrice()}
              />
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Return
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Finish My Purchase"
                      : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
        {showSnackbar && (
          <SuccessSnackbar
            message={snackbarMessage}
            severity={severityStatus}
          />
        )}
      </Container>
    </>
  );
};

export default Checkout;
