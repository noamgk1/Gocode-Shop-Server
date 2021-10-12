import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";

const theme = createTheme({
  text: {
    primary: "#fff",
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#126264",
      contrastText: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "##5f9ea0",
      dark: "#b2102f",
    },
  },
});

export default function Checkout() {
  const { cartList, setCartList } = useContext(CartContext);
  const itemsPrice = cartList
    ? cartList.reduce((a, c) => a + c.qty * c.price, 0)
    : null;
  const [data, setData] = useState(1);
  const history = useHistory();
  const [user] = useContext(UserContext);
  if (!user.user) {
    history.push("/");
  }

  const userDetail = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    if (user.user) {
      fetch("/api/orders/", {
        method: "POST", // or 'PUT'
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({ cartList, userDetail, user, itemsPrice }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setCartList([]);
          localStorage.removeItem("Cart");
        })
        .catch((error) => {
          console.error("Error:", error);
          setData(0);
        });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {data === 1 ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom align="center">
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1" align="center">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
            <Typography align="center">
              <Button
                onClick={() => history.go("/")}
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
              >
                Home Page
              </Button>
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="h5" gutterBottom align="center">
              Sorry...
            </Typography>
            <Typography variant="subtitle1" align="center">
              There was a problem ordering, please try again
            </Typography>
            <Typography align="center">
              <Button
                onClick={() => history.goBack()}
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
              >
                Checkout
              </Button>
            </Typography>
          </React.Fragment>
        )}
      </React.Fragment>
    </ThemeProvider>
  );
}
