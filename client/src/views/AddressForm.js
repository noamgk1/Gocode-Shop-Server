import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddressForm() {
  const [control, setControl] = useState();
  function inputChangedHandler(e) {
    setControl({ ...control, [e.target.id]: e.target.value });
    localStorage.setItem("userDetail", JSON.stringify(control));
  }

  const userDetail = (e) => {};

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="street"
            name="street"
            label="Street"
            fullWidth
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="number"
            name="number"
            label="Home Number"
            fullWidth
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="apartment"
            name="apartment"
            label="Apartment Number"
            fullWidth
            required
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => inputChangedHandler(e)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
