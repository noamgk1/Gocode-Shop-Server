import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/PreLoading/Loading";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CartContext } from "../Context/CartContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function ProductDetails() {
  const { id } = useParams();
  const { onAdd, onRemove, qtyId } = useContext(CartContext);
  const [Product, setProduct] = useState([]);
  const [preLoading, setPreLoading] = useState(false);
  useEffect(() => {
    setPreLoading(true);
    const url = `/api/products/${id}`;
    axios
      .get(url)
      .then((res) => {
        let data = res.data;
        setProduct(data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // useEffect(() => {
  //   setPreLoading(true);
  //   fetch(`/api/products/${id}`)
  //     .then((res) => res.json())
  //     .catch((error) => console.log(error))
  //     .then((json) => {
  //       setProduct(json);
  //       setPreLoading(false);
  //     })
  //     .catch((error) => console.log(error));
  // }, [id]);
  const qty = qtyId(id);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {preLoading && <Loading />}
      <Paper className={classes.paper}>
        <Grid container>
          <CardActionArea>
            <CardMedia
              className={classes.img}
              component={"img"}
              alt={Product.title}
              height="300"
              image={Product.image}
              title={Product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {Product.description}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onAdd(Product)}
              >
                Add to cart
              </Button>
              {qty > 0 && (
                <Button variant="contained" disabled>
                  {qty}
                </Button>
              )}
              {qtyId(id) > 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onRemove(Product)}
                >
                  Remove
                </Button>
              )}
            </ButtonGroup>

            <Typography variant="subtitle1">$ {Product.price}</Typography>
          </CardActions>
        </Grid>
      </Paper>
    </div>
  );
}
