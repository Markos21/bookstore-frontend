import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import SuccessSnackbar from "../ui/SuccessSnackbar";

import { UserContext } from "../../context/UserContext";
import { login } from "../../services/AuthService";

const AuthContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severityStatus, setSeverityStatus] = useState("success");
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setSeverityStatus("error");
      setSnackbarMessage("Please enter both email and password.");
      setShowSnackbar(true);
      return;
    }

    try {
      setLoading(true);

      const response = await login(email, password);

      if (response.result) {
        // Login successful
        setUserData(response.data);

        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/dashboard");
        setLoading(false);
        setShowSnackbar(true);
        setSeverityStatus("success");
        setSnackbarMessage(response.message);
      } else {
        // Login failed
        setSeverityStatus("error");
        setSnackbarMessage(response.message);
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
        <Typography variant="h5">Login</Typography>
        <form>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
            Sign Up
          </Link>
        </Typography>
      </div>

      {showSnackbar && (
        <SuccessSnackbar message={snackbarMessage} severity={severityStatus} />
      )}
    </Container>
  );
};

export default AuthContainer;
