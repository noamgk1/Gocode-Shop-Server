import SideCart from "../components/SideCart";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignInSide from "../components/Users/SignInSide";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import Logout from "../components/Users/Logout";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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

import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withStyles } from "@material-ui/core/styles";

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
    width: 270,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [user] = useContext(UserContext);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const loginPage = () => {
    handleMenuClose();
    return history.push("/login");
  };

  const controlPage = () => {
    handleMenuClose();
    return history.push("/control");
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [state, setState] = React.useState({
    left: false,
  });

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
  const renderMenu = (
    <Paper sx={{ width: 200 }}>
      <MenuList dense>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={controlPage}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText inset>Control</ListItemText>
          </MenuItem>
          <Divider />

          <MenuItem onClick={loginPage}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText inset>Login</ListItemText>
          </MenuItem>
        </Menu>
      </MenuList>
    </Paper>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Paper sx={{ width: 320 }}>
  //     <MenuList dense>
  //       <Menu
  //         anchorEl={mobileMoreAnchorEl}
  //         anchorOrigin={{
  //           vertical: "top",
  //           horizontal: "right",
  //         }}
  //         id={mobileMenuId}
  //         keepMounted
  //         transformOrigin={{
  //           vertical: "top",
  //           horizontal: "right",
  //         }}
  //         open={isMobileMenuOpen}
  //         onClose={handleMobileMenuClose}
  //       >
  //         <MenuItem>
  //           {!user.user && <SignInSide />}
  //           {user.user && <Logout />}
  //         </MenuItem>
  //         <Divider />
  //         <MenuItem onClick={handleProfileMenuOpen}>
  //           <IconButton
  //             size="large"
  //             aria-label="account of current user"
  //             aria-controls="primary-search-account-menu"
  //             aria-haspopup="true"
  //             color="inherit"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <h6>More</h6>
  //         </MenuItem>
  //       </Menu>
  //     </MenuList>
  //   </Paper>
  // );

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

          <MenuList>
            <MenuItem onClick={controlPage}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText inset>Control</ListItemText>
            </MenuItem>
            <Divider />

            <MenuItem onClick={loginPage}>
              <LoginIcon fontSize="small" />

              <ListItemText inset>Login</ListItemText>
            </MenuItem>
          </MenuList>

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
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </div>
      </Grid>
    </Grid>
  );
  return (
    <React.Fragment key={"right"}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="#5F9EA0">
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
            <SideCart />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {!user.user && <SignInSide />}
              {user.user && <Logout />}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
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
                onClick={handleMobileMenuOpen && toggleDrawer("right", true)}
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

        {renderMenu}
        <br />
        <br />
        <br />
        <br />
      </Box>
    </React.Fragment>
  );
}

export default NavBar;
