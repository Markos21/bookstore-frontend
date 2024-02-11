import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const AddressForm = () => {
  const { userData, handleChange, errors } = useContext(UserContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <Grid container spacing={3} className="animate__animated animate__fadeIn">
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="address"
            fullWidth
            variant="standard"
            value={userData.address}
            error={!!errors.address}
            helperText={errors.address}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="city"
            fullWidth
            variant="standard"
            value={userData.city}
            error={!!errors.city}
            helperText={errors.city}
            onChange={handleChange}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={userData.state}
            error={!!errors.state}
            helperText={errors.state}
            onChange={handleChange}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="zip"
            name="zip"
            label="Zip code"
            fullWidth
            variant="standard"
            value={userData.zip}
            error={!!errors.zip}
            helperText={errors.zip}
            onChange={handleChange}
            inputProps={{ max: 999999, min: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="standard"
            value={userData.phoneNumber}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            onChange={handleChange}
            inputProps={{ max: 9999999999, min: 0 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
