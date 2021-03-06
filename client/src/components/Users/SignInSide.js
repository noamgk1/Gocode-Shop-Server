import React from "react";
import { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://gocode-shop-noam.herokuapp.com/">
        My Shop - Noamgk1
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const SignInSide = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false,
  });
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
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

  async function login(e) {
    e.preventDefault();
    const url = "/api/users/login";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const user = await axios.post(url, values, options);

    if (user.status === 200) {
      localStorage.setItem("user", JSON.stringify(user.data));

      setUser({
        accessToken: user.data.token,
        user: user.data.user,
        id: user.data.id,
      });
      setState({
        left: false,
      });
      if (user.data.admin) {
        setAdmin(true);
        history.push("/control");
      } else {
        setAdmin(false);
        history.goBack();
      }
    }
  }

  const sign = (anchor) => (
    <Grid container component="main" className={classes.root}>
      <Grid component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonPinIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => login(e)}
            >
              Sign In
            </Button>
            <Grid container>
              {!user.user && (
                <Grid item>
                  Don't have an account?
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push("/SignUp")}
                  >
                    Sign Up
                  </Button>
                </Grid>
              )}
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment key={"right"}>
      <IconButton
        className={classes.margin}
        onClick={toggleDrawer("right", true)}
      >
        <StyledBadge>
          <AccountCircleIcon variant="outlined" />
        </StyledBadge>
        <h6> Login</h6>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {sign("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
};
export default SignInSide;
