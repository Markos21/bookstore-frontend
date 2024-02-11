import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import CartWidget from "../Cart/CartWidget";
import Logo from "./Logo";
import MenuNavList from "./MenuNavList";
import Auth from "../Auth/AuthNav";

import ThemeContext from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const NavBar = () => {
  const pages = ["Fictions", "Science", "Comedy"];
  const { userData, setUserData } = useContext(UserContext);
  const { resetCart } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    handleMenuClose();
  };

  const handleLogout = () => {
    // Clear user data from context and local storage
    setUserData(null);
    resetCart();
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");

    navigate("/");
    handleMenuClose();
  };

  return (
    <ThemeContext>
      <AppBar position="static" sx={{ bgcolor: "#0F1111" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <MenuNavList pages={pages} />
            <Container maxWidth="xs" disableGutters>
              <SearchBar />
            </Container>
            <CartWidget />
            {userData &&
            Object.values(userData).some((value) => value !== "") ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Auth />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeContext>
  );
};

export default NavBar;
