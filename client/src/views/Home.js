import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Loading from "../components/PreLoading/Loading";
import Products from "../components/Products/Products";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Home() {
  const [products, setProducts] = useState([]);
  const [firstProducts, setFirstProducts] = useState([]);
  const [preLoading, setPreLoading] = useState(false);
  const [productsFilterPrice, setProductsFilterPrice] = useState([]);
  const classes = useStyles();
  const onChoose = (c) => {
    console.log(c.target.value);
    if (c.target.value === "All Products") {
      setProducts(firstProducts);
      setProductsFilterPrice(firstProducts);
    } else {
      setProducts(
        firstProducts.filter((choose) => choose.category === c.target.value)
      );
      setProductsFilterPrice(
        firstProducts.filter((choose) => choose.category === c.target.value)
      );
    }
  };

  const onHandleChange = (event, newValue) => {
    console.log(newValue);
    setProducts(
      productsFilterPrice.filter(
        (choose) => choose.price >= newValue[0] && choose.price <= newValue[1]
      )
    );
  };

  useEffect(() => {
    setPreLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFirstProducts(json);
        setProductsFilterPrice(json);
        setPreLoading(false);
      });
  }, []);
  const values = productsFilterPrice
    .map((p) => p.price)
    .filter((value) => value > 0);

  const categories = [
    "All Products",
    ...firstProducts
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index),
  ];

  const onSearch = (e) => {
    const search = e.target.value;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(`/api/products/?title=${search}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((product) => {
            setProducts(product);
          });
        resolve();
      }, 1000);
    });
  };

  return (
    <Grid alignItems="center">
      <div className={classes.root}>
        <Header
          onChoose={onChoose}
          categories={categories}
          value={values}
          handleChange={onHandleChange}
          onSearch={onSearch}
        />

        <br />
        {preLoading && <Loading />}
        <br />
        <Grid container spacing={2} alignItems="center">
          <Products products={products} />
        </Grid>
      </div>
    </Grid>
  );
}

export default Home;
