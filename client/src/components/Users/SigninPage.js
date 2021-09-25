import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SettingControls = {
  email: "",
  password: "",
};

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const [control, setControl] = useState(SettingControls);

  function inputChangedHandler(e) {
    setControl({ ...control, [e.target.id]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const url = "/api/users/login";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const user = await axios.post(url, control, options);
    console.log(user);
    if (user.status === 200) {
      localStorage.setItem("user", JSON.stringify(user.data));

      setUser({
        accessToken: user.data.token,
        user: user.data.user,
        admin: user.data.admin,
      });

      if (user.data.admin) {
        history.push("/control");
      } else {
        history.push("/");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
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
            onChange={(e) => inputChangedHandler(e)}
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
            onChange={(e) => inputChangedHandler(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => submitHandler(e)}
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
              <Link to="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
