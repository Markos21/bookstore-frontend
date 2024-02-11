import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import ItemDescription from "./ItemDescription";
import ItemCount from "./ItemCount";

import SuccessSnackbar from "../ui/SuccessSnackbar";
import GoBackBtn from "../ui/GoBackBtn";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const ItemDetail = ({ id, title, writer, cover_image_url, price, tags }) => {
  const { addItemToCart, isInCart } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severityStatus, setSeverityStatus] = useState("success");
  const itemsInfo = { title, writer, tags };
  const point = 9;

  const handleAddItemToCart = (quantity) => {
    if (!userData || Object.values(userData).some((value) => value == "")) {
      setSeverityStatus("error");
      setSnackbarMessage("Please Login First");
      setShowSnackbar(true);
      return;
    }
    if (isInCart(id) || quantity === 0) return;

    addItemToCart({ id, title, price, quantity, cover_image_url });
    setSeverityStatus("success");
    setSnackbarMessage("Item Added to cart");
    setShowSnackbar(true);
  };

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
  return (
    <>
      <Grid
        container
        mt={5}
        className="animate__animated animate__fadeIn"
        spacing={3}
      >
        <Grid
          item
          sm={6}
          md={4}
          className="animate__animated animate__fadeInLeft"
        >
          <Card raised>
            <CardMedia component="img" image={cover_image_url} alt={id} />
          </Card>
          <Box
            display="flex"
            justifyContent="space-between"
            mt={1}
            alignContent="center"
          >
            <GoBackBtn />

            <Typography component="h5" variant="h6" textAlign="center">
              ${price}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Typography component="h3" textAlign="center" gutterBottom>
            {title}
          </Typography>
          <Divider />

          <ItemDescription characteristics={itemsInfo} />
          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent={"center"} my>
            {isInCart(id) ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<AssignmentTurnedInIcon />}
                component={Link}
                to="/cart"
              >
                Finish My Purchase
              </Button>
            ) : point > 0 ? (
              <ItemCount stock={point} onAdd={handleAddItemToCart} />
            ) : (
              <Typography variant="h6" color="textSecondary">
                Out Of Points
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      {showSnackbar && (
        <SuccessSnackbar message={snackbarMessage} severity={severityStatus} />
      )}
    </>
  );
};

export default ItemDetail;
