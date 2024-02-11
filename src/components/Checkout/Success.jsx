import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";

const Success = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        className="animate__animated animate__pulse"
      >
        <img src="/assets/img/logo.png" alt="success" width={200} />
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        Thank you very much for your purchase!
      </Typography>

      <Button
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3, mx: "auto", display: "block", textAlign: "center" }}
      >
        Back to home
      </Button>
    </>
  );
};
export default Success;
