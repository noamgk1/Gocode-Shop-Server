import "./Products.css";
import Product from "../Product/Product";
import Grid from "@material-ui/core/Grid";
const Products = ({ products }) => {
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
          key={products._id}
          id={products._id}
          title={products.title}
          price={products.price}
          description={products.description}
          category={products.category}
          image={products.image}
        />
      ))}
    </Grid>
  );
};

export default Products;
