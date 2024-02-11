import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

import SuccessSnackbar from "../ui/SuccessSnackbar";
import { UserContext } from "../../context/UserContext";

import {
  getOrdersByCustomerId,
  cancelOrder,
} from "../../services/OrderService";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severityStatus, setSeverityStatus] = useState("success");
  const { userData, setUserData } = useContext(UserContext);
  const { userId } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          if (parsedUserData && parsedUserData.userId) {
            setUserData(parsedUserData);
            const response = await getOrdersByCustomerId(parsedUserData.userId);
            if (response.result && response.data) {
              setOrders(response.data);
            }
          } else {
            // If userId is not available, redirect to auth
            navigate("/auth");
            setSeverityStatus("error");
            setSnackbarMessage("User ID not found");
            setShowSnackbar(true);
          }
        } else {
          // If no stored user data, redirect to auth
          navigate("/auth");
        }
      } catch (error) {
        setSeverityStatus("error");
        setSnackbarMessage(error.message || "An error occurred");
        setShowSnackbar(true);
      }
    };

    fetchOrders();
  }, [navigate, setUserData]);

  useEffect(() => {
    if (showSnackbar) {
      // Hide the snackbar after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      // Clear the timeout when the component unmounts or when showSnackbar changes
      return () => clearTimeout(timeoutId);
    }
  }, [showSnackbar, navigate]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrder(orderId);
      if (response.status === 204) {
        setSeverityStatus("success");
        setSnackbarMessage("Order Canceled Successfully");
        setShowSnackbar(true);

        // Update the order status to "Canceled" locally
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderid === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      } else {
        setSeverityStatus("error");
        setSnackbarMessage("Something went wrong");
        setShowSnackbar(true);
      }
    } catch (error) {
      setSeverityStatus("error");
      setSnackbarMessage(error.message || "An error occurred");
      setShowSnackbar(true);
    }
  };

  return (
    <Container
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">My Orders</Typography>
      <Typography
        variant="h6"
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        Your Remainig Points: {userData.customer_points}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderid}>
                <TableCell>{order.orderid}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "Completed"
                        ? "default"
                        : order.status === "Pending"
                        ? "secondary"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  {order.status !== "Canceled" && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleCancelOrder(order.orderid)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showSnackbar && (
        <SuccessSnackbar message={snackbarMessage} severity={severityStatus} />
      )}
    </Container>
  );
};

export default Dashboard;
