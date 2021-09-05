import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

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

const useStyles = makeStyles((theme) => ({
  list: {
    width: 400,
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
  const { cartList } = useContext(CartContext);
  const classes = useStyles();
  const itemsPrice = cartList.reduce((a, c) => a + c.qty * c.price, 0);
  const [state, setState] = React.useState({
    left: false,
  });
  const { onRemove, onAdd } = useContext(CartContext);
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
      <Typography variant="h6" className={classes.title}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <br />
          My Cart
        </Grid>
      </Typography>

      <Divider />

      <List>
        {cartList.length === 0 && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <br />
            <h2>Cart Is Empty</h2>
          </Grid>
        )}
        {cartList.map((p) => (
          <ListItem>
            <ListItemIcon>
              <img src={p.image} width="50" height="50" alt=" " />
            </ListItemIcon>
            <ListItemText
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
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <IconButton
          className={classes.margin}
          onClick={toggleDrawer("right", true)}
        >
          <StyledBadge badgeContent={cartList.length} color="primary">
            <ShoppingCartIcon variant="outlined" />
          </StyledBadge>
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
