import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import SuccessSnackbar from "../ui/SuccessSnackbar";
import { signUp } from "../../services/AuthService";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severityStatus, setSeverityStatus] = useState("success");
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setSeverityStatus("error");
      setSnackbarMessage("All fields are required.");
      setShowSnackbar(true);
      return;
    }
    // Set loading state to true while making the API request
    try {
      setLoading(true);
      const response = await signUp(name, email, password);
      if (response.result) {
        setSeverityStatus("success");
        setSnackbarMessage(
          "You Have Successfully Registered! Login into your account"
        );
        setShowSnackbar(true);
        setLoading(false);
        navigate("/auth");
      } else {
        setSeverityStatus("error");
        setSnackbarMessage(response.response.data.message);
        setShowSnackbar(true);
        setLoading(false);
      }
    } catch (error) {
      setSeverityStatus("error");
      setSnackbarMessage("An error occurred while logging in.");
      setShowSnackbar(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (showSnackbar) {
      // Hide the snackbar after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setLoading(false);
        navigate("/dashboard");
      }
      // Clear the timeout when the component unmounts or when showSnackbar changes
      return () => clearTimeout(timeoutId);
    }
  }, [showSnackbar, setUserData, navigate]);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Typography variant="h5">Sign Up</Typography>
        <form>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            sx={{ marginTop: 2 }}
          >
            {loading ? "Processing..." : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{" "}
          <Link to="/auth" style={{ textDecoration: "none", color: "blue" }}>
            Log In
          </Link>
        </Typography>
      </div>
      {showSnackbar && (
        <SuccessSnackbar message={snackbarMessage} severity={severityStatus} />
      )}
    </Container>
  );
};

export default SignUp;
