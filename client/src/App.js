import "./App.css";
import React from "react";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";
import AdminControl from "./Admin/AdminControl";
import SignUp from "./components/Users/SignUp";
import Logout from "./components/Users/Logout";
import SigninPage from "./components/Users/SigninPage";
import NavBar from "./views/NavBar";
import UserContextProvider from "./Context/UserContext";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CartContextProvider from "./Context/CartContext";
import AdminContextProvider from "./Context/AdminContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import EditProducts from "./Admin/EditProducts";
import EditCategories from "./Admin/EditCategories";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Orders from "./components/Users/Orders";
import ShowOrders from "./Admin/ShowOrders";

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
    <UserContextProvider>
      <AdminContextProvider>
        <CartContextProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <NavBar />
              <Container fixed>
                <Switch>
                  <Route path="/products/:id" component={ProductDetails} />
                  <Route exact path="/control" component={AdminControl} />
                  <Route
                    exact
                    path="/control/edit-products"
                    component={EditProducts}
                  />
                  <Route
                    exact
                    path="/control/edit-categories"
                    component={EditCategories}
                  />
                  <Route
                    exact
                    path="/control/show-orders"
                    component={ShowOrders}
                  />
                  <Route exact path="/checkout" component={Checkout} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/orders" component={Orders} />
                  <Route exact path="/contact" component={Orders} />
                  <Route exact path="/login" component={SigninPage} />
                  <Route exact path="/signUp" component={SignUp} />
                  <Route exact path="/logout" component={Logout} />
                  <Route path="/" component={Home} />
                  <Route
                    path="/*"
                    component={() => (
                      <div align="center">404 Page Not Found</div>
                    )}
                  />
                  <Route
                    path="/product/*"
                    component={() => (
                      <div align="center">404 Page Not Found</div>
                    )}
                  />
                </Switch>
              </Container>
            </BrowserRouter>
          </ThemeProvider>
        </CartContextProvider>
      </AdminContextProvider>
    </UserContextProvider>
  );
}

export default App;
