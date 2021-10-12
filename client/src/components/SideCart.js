import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(4, 4),
  },
  fullList: {
    width: "auto",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1, "auto"),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sub: {
    margin: theme.spacing(2, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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

const SideCart = () => {
  const history = useHistory();
  const { cartList } = useContext(CartContext);
  const { onRemove, onAdd } = useContext(CartContext);
  const classes = useStyles();
  const itemsPrice = cartList
    ? cartList.reduce((a, c) => a + c.qty * c.price, 0)
    : null;
  const [state, setState] = React.useState({
    right: false,
  });

  const cart = () => {
    setState({ ...state, right: false });
    return history.push("/cart");
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h1" variant="h4" className={classes.title}>
          My Cart
        </Typography>
      </Grid>

      <Divider />

      <List>
        {cartList.length === 0 && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography component="h1" variant="h6" className={classes.title}>
              Your Cart Is Empty
            </Typography>
          </Grid>
        )}
        {cartList.map((p) => (
          <ListItem>
            <ListItemIcon>
              <img src={p.image} width="50" height="50" alt=" " />
            </ListItemIcon>
            <ListItemText
              className={classes.sub}
              primary={p.title.slice(0, 20)}
              secondary={p.price + " $"}
            />
            <div className={classes.root}>
              <ListItemSecondaryAction>
                <IconButton className={classes.margin} onClick={() => onAdd(p)}>
                  <AddBoxIcon />
                </IconButton>
                <>{p.qty}</>
                <IconButton
                  className={classes.margin}
                  onClick={() => onRemove(p)}
                >
                  <IndeterminateCheckBoxIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </div>
            <Divider />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Total payment:" />
          <ListItemSecondaryAction>{itemsPrice} $ </ListItemSecondaryAction>
        </ListItem>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={cart}
        >
          Your Cart
        </Button>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          className={classes.margin}
          onClick={toggleDrawer("right", true)}
        >
          <StyledBadge
            badgeContent={cartList ? cartList.length : null}
            color="primary"
          >
            <ShoppingCartIcon variant="outlined" />
          </StyledBadge>

          <h6>My Cart</h6>
        </IconButton>

        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
export default SideCart;
