import "./Products.css";
import Product from "../Product/Product";
import Grid from "@material-ui/core/Grid";
const Products = ({ products, category, onChoose }) => {
  //change from id to name
  const whatCategory = (id) => {
    const c = category.filter((p) => p._id === id);
    if (c[0]) {
      return c[0]["name"];
    } else return " ";
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {products.map((products) => (
        <Product
          onChoose={onChoose}
          key={products._id}
          id={products._id}
          title={products.title}
          price={products.price}
          description={products.description}
          category={whatCategory(products.category)}
          image={products.image}
        />
      ))}
    </Grid>
  );
};

export default Products;
