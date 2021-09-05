import "./App.css";
import SideCart from "./components/SideCart";
import Home from "./views/Home";
import CartContextProvider from "./Context/CartContext";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProductDetails from "./views/ProductDetails";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminControl from "./views/AdminControl";
import SignInSide from "./components/SignIn/SignInSide";
import SignUp from "./components/SignIn/SignUp";
import { UserContext, UserCtx } from "./Context/UserContext";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SignInAdmin from "./components/SignIn/SignInAdmin";
import { userHistory } from "react-router";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContext>
        <CartContextProvider>
          <Router>
            <AppBar color="#5F9EA0">
              <Toolbar>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs>
                    <Typography
                      fontFamily="fontFamily"
                      variant="h5"
                      color="#5F9EA0"
                    >
                      <Link to="/">My Shop</Link>
                    </Typography>
                  </Grid>
                  <Grid xs={1}>
                    <Typography variant="h4">
                      <Link to="/control">control</Link>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <SideCart />

                    <SignInSide />
                    <SignInAdmin />
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Toolbar />
            <br />
            <Container maxWidth="lg">
              <Switch>
                <Route path="/control">
                  <AdminControl className="App-header" />
                </Route>
                <Route path="/product/:id">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ProductDetails />
                  </Grid>
                </Route>

                <Route path="/signUp">
                  <SignUp />
                </Route>
                <Route path="/">
                  <Home className="App-header" />
                </Route>
              </Switch>
            </Container>
          </Router>
        </CartContextProvider>
      </UserContext>
    </ThemeProvider>
  );
}

export default App;
