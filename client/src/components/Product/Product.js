import "./Product.css";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Grid } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { CartContext } from "../../Context/CartContext";
import RubberBand from "react-reveal/RubberBand";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  title: {
    minHeight: 100,
    height: 100,
  },
  media: {
    height: 100,
    paddingTop: "70%", // 16:9
  },
}));

const Product = ({ id, image, title, price, category, key }) => {
  const classes = useStyles();

  const titleLength =
    title.length > 30
      ? title.slice(0, 30)
      : title.length < 21
      ? title + "-My Shop"
      : title;

  const cart = { id: id, title: title, price: price, image: image, key: key };
  const { onAdd, onRemove, qtyId } = useContext(CartContext);
  const qty = qtyId(id);
  return (
    <Fade top cascade>
      <div>
        <div className="product-card">
          <Card className={classes.root}>
            <div className="product-image">
              <CardMedia
                className={classes.media}
                image={image}
                title={title}
              />
            </div>
            <div className="product-info">
              <CardHeader
                className={classes.root}
                title={<div>{titleLength}</div>}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <h1>
                    <b>{price} $</b>
                  </h1>

                  <br />
                  <h4>{category}</h4>
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      variant="outlined"
                      color="black"
                      onClick={() => onAdd(cart)}
                    >
                      +
                    </Button>

                    {qty > 0 && (
                      <Button variant="contained" disabled>
                        <RubberBand>{qty}</RubberBand>
                      </Button>
                    )}

                    {qtyId(id) > 0 && (
                      <Button
                        variant="outlined"
                        color="black"
                        onClick={() => onRemove(cart)}
                      >
                        -
                      </Button>
                    )}
                  </ButtonGroup>
                </Grid>

                <IconButton href={`/product/${id}`} aria-label="show more">
                  <h6>More</h6>
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </Fade>
  );
};
//<button onClick={onCart(title)}>Add To card</button>
export default Product;
