import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const Review = () => {
  const {
    userData: { address, name, state, city },
  } = useContext(UserContext);

  const { cart, totalCartPrice } = useContext(CartContext);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Purchase Summary
      </Typography>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              {item.price * item.quantity}
            </Typography>
          </ListItem>
        ))}

        <ListItem key={1} sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`${totalCartPrice()}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipment
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>
            {[address, state, city].join(", ")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
