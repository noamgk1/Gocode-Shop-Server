import FilterByPrice from "../FilterByPrice";
import "./Header.css";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
      color: "#00acc1",
    },

    palette: {
      primary: {
        main: "#00acc1",
      },
      secondary: {
        main: "#467eac",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = ({ categories, onChoose, value, handleChange, onSearch }) => {
  let index = 1;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className={classes.search}>
                <div align="left" className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={onSearch}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <div align=" center" dir="ltr">
                <FilterByPrice value={value} handleChange={handleChange} />
              </div>

              <div align="right">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Filter by:"
                  variant="outlined"
                  onChange={onChoose}
                >
                  {categories.map((p) => (
                    <MenuItem key={index++} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};

export default Header;
