import "./App.css";
import React from "react";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";
import AdminControl from "./views/AdminControl";
import SignUp from "./components/Users/SignUp";
import NavBar from "./views/NavBar";
import { UserContext } from "./Context/UserContext";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CartContextProvider from "./Context/CartContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
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
    <UserContext>
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NavBar />
            <Container fixed>
              <Switch>
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/control" component={AdminControl} />
                <Route exact path="/signUp" component={SignUp} />
                <Route exact path="/" component={Home} />
                <Route
                  path="/*"
                  component={() => <div align="center">404 Page Not Found</div>}
                />
              </Switch>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </CartContextProvider>
    </UserContext>
  );
}

export default App;
