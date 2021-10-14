import SideCart from "../components/SideCart";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignInSide from "../components/Users/SignInSide";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { AdminContext } from "../Context/AdminContext";
import { useContext } from "react";
import Logout from "../components/Users/Logout";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewListIcon from "@mui/icons-material/ViewList";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 250,
  },
  menu: {
    margin: theme.spacing(4, 4),
    flexDirection: "column",
    alignItems: "center",
    width: 250,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function NavBar() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const history = useHistory();
  const [state, setState] = React.useState({
    right: false,
  });

  const loginPage = () => {
    setState({ ...state, right: false });

    return history.push("/login");
  };

  const controlPage = () => {
    setState({ ...state, right: false });

    return history.push("/control");
  };

  const cartPage = () => {
    setState({ ...state, right: false });

    return history.push("/cart");
  };

  async function logoutPage(e) {
    setState({ ...state, right: false });
    e.preventDefault();

    const url = "/api/users/logout";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const user1 = await axios.post(url, user, options);

      if (user1.status === 200) {
        localStorage.removeItem("user");

        setUser({
          accessToken: null,
          user: null,
        });
        setAdmin(false);
        return history.push("/");
      }
    } catch (err) {
      // throw Error(err);
      console.log(err);
    }
  }

  const ordersPage = () => {
    setState({ ...state, right: false });

    return history.push("/orders");
  };

  const contactPage = () => {
    setState({ ...state, right: false });

    return history.push("/contact");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Grid container component="main" className={classes.root}>
      <Grid component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonPinIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome {user.user}
          </Typography>
          <div className={classes.menu}>
            <MenuList>
              {user.user && (
                <>
                  <MenuItem onClick={(e) => logoutPage(e)}>
                    <LogoutIcon fontSize="small" />

                    <ListItemText inset>Logout</ListItemText>
                  </MenuItem>
                  <Divider />
                </>
              )}
              {!user.user && (
                <>
                  <MenuItem onClick={loginPage}>
                    <LoginIcon fontSize="small" />

                    <ListItemText inset>Login</ListItemText>
                  </MenuItem>
                  <Divider />
                </>
              )}
              {admin === true && (
                <>
                  <MenuItem onClick={controlPage}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText inset>Admin Control</ListItemText>
                  </MenuItem>
                  <Divider />
                </>
              )}
              <MenuItem onClick={cartPage}>
                <ListItemIcon>
                  <ShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText inset>Cart</ListItemText>
              </MenuItem>
              <Divider />
              {user.user && (
                <>
                  <MenuItem onClick={ordersPage}>
                    <ListItemIcon>
                      <ViewListIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText inset>Orders</ListItemText>
                  </MenuItem>
                  <Divider />
                </>
              )}

              <MenuItem onClick={contactPage}>
                <ListItemIcon>
                  <EmojiPeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText inset>Contact Us</ListItemText>
              </MenuItem>
              <Divider />
            </MenuList>
          </div>
          {/* <MenuItem>
            {!user.user && <SignInSide />}
            {user.user && <Logout />}
          </MenuItem> */}
          <Divider />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href="tel:+972-555-555-1212"
          >
            Call Us
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
          <Box mt={5}></Box>
        </div>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment key={"right"}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="secondary">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

            <Typography variant="h6" noWrap component="div">
              <NavLink to="/">My Shop</NavLink>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!user.user && <SignInSide />}
              {user.user && <Logout />}
            </Box>
            <SideCart />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={toggleDrawer("right", true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={toggleDrawer("right", true)}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {renderMobileMenu}
        </SwipeableDrawer>

        <br />
        <br />
        <br />
        <br />
      </Box>
    </React.Fragment>
  );
}

export default NavBar;
