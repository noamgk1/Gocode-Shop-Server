import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";
import { useContext } from "react";
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
export default function AdminControl() {
  const classes = useStyles();
  const history = useHistory();
  const [admin] = useContext(AdminContext);

  if (!admin === true) {
    history.push("/");
  }

  const editP = () => {
    return history.push("/control/edit-products");
  };

  const editO = () => {
    return history.push("/control/show-orders");
  };

  const editC = () => {
    return history.push("/control/edit-categories");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <Box
          className={classes.form}
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Control
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              className={classes.submit}
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={editP}
            >
              Edit Products
            </Button>
            <Button
              className={classes.submit}
              fullWidth
              color="primary"
              variant="contained"
              onClick={editC}
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Categorie
            </Button>
            <Button
              className={classes.submit}
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={editO}
            >
              Show Order
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
