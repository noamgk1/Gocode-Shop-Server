import React from "react";
import SideCart from "../components/SideCart";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SignInSide from "../components/Users/SignInSide";
import SignInAdmin from "../components/Users/SignInAdmin";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

function NavBar() {
  return (
    <>
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
              <Typography fontFamily="fontFamily" variant="h5" color="#5F9EA0">
                <NavLink to="/">My Shop</NavLink>
              </Typography>
            </Grid>
            <Grid xs={1}>
              <Typography variant="h4">
                <NavLink to="/control">control</NavLink>
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
    </>
  );
}

export default NavBar;
