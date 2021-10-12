import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "60%",
  maxHeight: "60%",
});

export default function Review() {
  const { cartList } = useContext(CartContext);
  const itemsPrice = cartList
    ? cartList.reduce((a, c) => a + c.qty * c.price, 0)
    : null;

  const addresses = JSON.parse(localStorage.getItem("userDetail"));
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartList.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ButtonBase sx={{ width: 70, height: 70 }}>
              <Img alt={product.title} src={product.image} />
            </ButtonBase>
            <ListItemText
              primary={product.title.slice(0, 14)}
              secondary={"Qty: " + product.qty}
            />
            <Typography variant="body2">
              ${product.price * product.qty}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {itemsPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {addresses.firstName + " " + addresses.lastName}
          </Typography>
          <Typography gutterBottom>
            {addresses.street +
              ", " +
              addresses.number +
              ", " +
              addresses.apartment}
          </Typography>
          <Typography gutterBottom>
            {addresses.city + ", " + addresses.country + ", " + addresses.zip}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
