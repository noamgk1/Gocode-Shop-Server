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
  const [preLoading, setPreLoading] = useState(false);
  const [productsFilterPrice, setProductsFilterPrice] = useState([]);

  const [setMinMax] = useState([]);
  const [categoryNow, setCategoryNow] = useState([]);
  const [categories, setCategories] = useState(["All Products"]);
  const classes = useStyles();

  //get the products from API

  useEffect(() => {
    setPreLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setProductsFilterPrice(json);
        setPreLoading(false);
      });
    fetch("/api/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      })
      .catch((error) => console.log(error));
  }, []);

  //set min and max from all products
  const values = productsFilterPrice
    .map((p) => p.price)
    .filter((value) => value > 0);

  //choose from query
  const onChooseCategory = (e) => {
    const search = e;
    setCategoryNow(search);
    setPreLoading(true);

    const id = categories.filter((p) => p.name === search);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(`/api/products/?category=${id[0]["_id"]}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((product) => {
            setProducts(product);
            setPreLoading(false);
          });
        resolve();
      }, 1000);
    });
  };

  const onChoose = (e) => {
    console.log(e);
    const search = e.target.value;
    setCategoryNow(search);
    setPreLoading(true);
    if (search === "All Products") {
      fetch("/api/products")
        .then((res) => res.json())
        .then((json) => {
          setProducts(json);
          setPreLoading(false);
        });
    } else {
      const id = categories.filter((p) => p.name === search);
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch(`/api/products/?category=${id[0]["_id"]}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((product) => {
              setProducts(product);
              setPreLoading(false);
            });
          resolve();
        }, 1000);
      });
    }
  };

  const onHandleChange = (event, newValue) => {
    setProducts(
      productsFilterPrice.filter(
        (choose) => choose.price >= newValue[0] && choose.price <= newValue[1]
      )
    );
  };

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
    <Grid>
      <div className={classes.root}>
        <Header
          setMinMax={[setMinMax]}
          onChoose={onChoose}
          categories={categories}
          value={values}
          handleChange={onHandleChange}
          onSearch={onSearch}
        />

        <br />
        {preLoading && <Loading />}
        <br />
        <Products
          products={products}
          category={categories}
          onChoose={onChooseCategory}
        />
      </div>
    </Grid>
  );
}

export default Home;
