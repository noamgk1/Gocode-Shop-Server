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
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 270,
  },
  title: {
    minHeight: 100,
    height: 100,
  },
  media: {
    maxHeight: 80,
    paddingTop: "100%", // 16:9
  },
}));

const Product = ({ onChoose, id, image, title, price, category, key }) => {
  const classes = useStyles();
  const history = useHistory();
  const click = () => {
    return history.push(`/products/${id}`);
  };

  // const titleLength =
  //   title.length > 25
  //     ? title.slice(0, 27)
  //     : title.length < 20
  //     ? title + "-My Shop"
  //     : title;

  const cart = {
    id: id,
    title: title,
    price: price,
    image: image,
    category: category,
    key: key,
  };
  const { onAdd, onRemove, qtyId } = useContext(CartContext);
  const qty = qtyId(id);
  return (
    <Fade top cascade>
      <Box
        sx={{
          width: {
            xs: 140, // theme.breakpoints.up('xs')
            sm: "auto", // theme.breakpoints.up('sm')
            md: 270, // theme.breakpoints.up('md')
            lg: 270, // theme.breakpoints.up('lg')
            xl: 270, // theme.breakpoints.up('xl')
          },
        }}
      >
        <div className="product-card">
          <Card className={classes.root}>
            <div className="product-image">
              <CardMedia
                onClick={click}
                alt={title}
                className={classes.media}
                image={image}
                title={title}
              />
            </div>
            <br />
            <div className="product-info">
              <CardHeader
                style={{ width: "auto", height: 45 }}
                onClick={click}
                className={classes.root}
                title={<h4>{title.replace(/^(.{20}[^\s]*).*/, "$1")}</h4>}
              />
              <br />
              <CardContent>
                <Typography component="p" variant="h6" color="secondary">
                  {price} $
                </Typography>
                <br />
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  onClick={() => onChoose(category)}
                >
                  {category}
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
                      color="default"
                      onClick={() => onAdd(cart)}
                    >
                      +
                    </Button>

                    {qty > 0 && (
                      <Button color="default" variant="contained" disabled>
                        <RubberBand>{qty}</RubberBand>
                      </Button>
                    )}

                    {qtyId(id) > 0 && (
                      <Button
                        variant="outlined"
                        color="default"
                        onClick={() => onRemove(cart)}
                      >
                        -
                      </Button>
                    )}
                  </ButtonGroup>
                </Grid>
                <Link to={`/products/${id}`}>
                  <IconButton aria-label="show more">
                    <h6>More</h6>
                    <ExpandMoreIcon />
                  </IconButton>
                </Link>
              </CardActions>
            </div>
          </Card>
        </div>
      </Box>
    </Fade>
  );
};
//<button onClick={onCart(title)}>Add To card</button>
export default Product;
