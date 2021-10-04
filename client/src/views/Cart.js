import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { makeStyles } from "@material-ui/core/styles";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import { UserContext } from "../Context/UserContext";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Cart() {
  const { cartList } = useContext(CartContext);
  const { onRemove, onAdd } = useContext(CartContext);
  const history = useHistory();
  const [user] = useContext(UserContext);
  const itemsPrice = cartList
    ? cartList.reduce((a, c) => a + c.qty * c.price, 0)
    : null;

  const loginPage = () => {
    return history.push("/login");
  };

  const paymentPage = () => {
    return history.push("payment");
  };

  return (
    <Box>
      <Grid
        container
        marginTop={4}
        marginBottom={6}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {" "}
        <Avatar sx={{ m: 1, bgcolor: "primary" }}>
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dear customers, the website is not yet used ...
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={8} spacing={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              My Cart
            </Typography>
          </Box>
          <Divider />
          <br />
          <Box>
            {cartList.length === 0 && (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <br />
                <Typography component="h1" variant="h6">
                  Your Cart Is Empty
                </Typography>
              </Grid>
            )}
            {cartList.map((p) => (
              <div>
                <Paper
                  sx={{ p: 2, margin: "auto", maxWidth: 600, flexGrow: 1 }}
                  key={p._id}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 70, height: 70 }}>
                        <Img alt={p.title} src={p.image} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {p.title.slice(0, 20)}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {p.price + " $"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="subtitle1" component="div">
                          <IconButton onClick={() => onAdd(p)}>
                            <AddBoxIcon />
                          </IconButton>
                          <>{p.qty}</>
                          <IconButton onClick={() => onRemove(p)}>
                            <IndeterminateCheckBoxIcon />
                          </IconButton>
                          <Grid item justifyContent="center">
                            <Typography variant="body2">
                              {p.price * p.qty + " $"}
                            </Typography>
                          </Grid>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
              </div>
            ))}
          </Box>
        </Grid>
        <Grid item xs="auto" md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <Grid>
              <Typography component="h1" variant="h5">
                Order summary
              </Typography>
            </Grid>
          </Box>
          <Divider />
          <br />
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={6} md={8}>
              <Typography variant="subtitle1">Interim amount:</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="subtitle1">{itemsPrice} $</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={6} md={8}>
              <Typography variant="subtitle1">Shipping:</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="subtitle1">Free</Typography>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <Divider />
          <br />
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={6} md={8}>
              <Typography variant="h6">Total:</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="subtitle1">{itemsPrice} $</Typography>
            </Grid>
          </Grid>
          <br />
          {!user.user && (
            <>
              <Grid item xs>
                <Typography variant="subtitle1">
                  You must be logged in to place an order
                </Typography>
              </Grid>
              <Button
                onClick={loginPage}
                type="submit"
                fullWidth
                variant="contained"
              >
                Login | Register
              </Button>
            </>
          )}
          {user.user && (
            <Button
              onClick={paymentPage}
              type="submit"
              fullWidth
              variant="contained"
            >
              Payment
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
