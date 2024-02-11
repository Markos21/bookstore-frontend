import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Container from "@mui/material/Container";

import Navbar from "../components/NavBar/NavBar";
import ItemListContainer from "../components/Item/ItemListContainer";
import ItemDetailContainer from "../components/Item/ItemDetailContainer";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import AuthContainer from "../components/Auth/AuthContainer";
import SignUp from "../components/Auth/SignUp";
import Dashboard from "../components/Auth/Dashboard";

import { UserContext } from "../context/UserContext";

const DashboardRoutes = () => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/search/:term" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />

          {/* Dashboard route */}
          {userData ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/auth" element={<AuthContainer />} />
          )}

          {/* Cart route */}
          {userData ? (
            <Route path="/cart" element={<Cart />} />
          ) : (
            <Route path="/auth" element={<AuthContainer />} />
          )}

          {/* Checkout route */}
          {userData ? (
            <Route path="/checkout" element={<Checkout />} />
          ) : (
            <Route path="/auth" element={<AuthContainer />} />
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default DashboardRoutes;
