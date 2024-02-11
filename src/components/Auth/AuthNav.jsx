import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const Auth = () => {
  return (
    <Button color="inherit" component={Link} to="/auth">
      Login
    </Button>
  );
};

export default Auth;
