import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

const Logo = () => (
  <Avatar
    component={Link}
    to="/"
    sx={{ marginRight: 3, height: 64 }}
    src="../assets/img/logo.png"
    alt="Logo"
    loading="lazy"
    variant="rounded"
  />
);

export default Logo;
