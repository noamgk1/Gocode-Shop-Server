const express = require("express");

const app = express();

const fs = require("fs");

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Client");
});

app.get("/products", (req, res) => {
  const { min, max, category, title } = req.query;

  Product.find(
    {
      $or: [
        { min: min },
        { max: max },
        { category: category },
        { title: title },
      ],
    },
    (err, products) => {
      if (min) {
        products = products.filter((p) => p.price > min);
      }

      if (max) {
        products = products.filter((p) => p.price < max);
      }

      if (category) {
        products = products.filter((p) =>
          p.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      if (title) {
        products = products.filter((p) =>
          p.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      if (products.length > 0) {
        res.send(products);
      } else {
        res.send("There are no matching products!");
      }
    }
  );
});

//get one product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    res.send(product);
  });
});

//post a new product
app.post("/products", (req, res) => {
  const { title, price, image, category, description } = req.body;
  if (title && price && image && category && description) {
    const product = new Product({ title, price, image, category, description });
    product.save();
    res.send("The product was added successfully! ");
  } else res.send("Missing product values");
});

//update the product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, image, category, description } = req.body;

  const updateFields = {};
  title ? (updateFields.title = title) : null;
  price ? (updateFields.price = price) : null;
  category ? (updateFields.category = category) : null;
  description ? (updateFields.description = description) : null;
  image ? (updateFields.image = image) : null;

  Product.findByIdAndUpdate(id, updateFields, (err, product) => {
    res.send("The product has been updated");
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id, (err, product) => {
    res.send(product);
  });
});

function initProduct() {
  Product.findOne((err, product) => {
    if (!product) {
      fs.readFile("./products.json", "utf8", (err, data) => {
        let initProducts = JSON.parse(data);
        Product.insertMany(initProducts, (err, products) => {});
      });
    }
  });
}

initProduct();

app.get("*", (req, res) => {
  res.send(404);
});

mongoose.connect(
  "mongodb://localhost/gocode_shop",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(8080);
  }
);
