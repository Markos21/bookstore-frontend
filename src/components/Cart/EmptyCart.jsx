import Typography from "@mui/material/Typography";
import GoBackBtn from "../ui/GoBackBtn";

const EmptyCart = () => (
  <>
    <Typography variant="h5" align="center" sx={{ my: 5 }}>
      There are no products in the cart
    </Typography>
    <GoBackBtn />
  </>
);

export default EmptyCart;
