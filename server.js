const { v4: uuidv4 } = require("uuid");

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

const Producttt = mongoose.model("Product", productSchema);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Client");
});

//get the products by filter
app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      res.send("Hi, the product not found!");
    } else {
      const { minPrice, maxPrice, category, title } = req.query;

      let products = JSON.parse(data);

      if (minPrice) {
        products = products.filter((p) => p.price > minPrice);
      }
      if (maxPrice) {
        products = products.filter((p) => p.price < maxPrice);
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
  });
});

//get one product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((a) => a.id == id);
    res.send(product);
    console.log(product);
  });
});

//post a new product
// app.post("/products", (req, res) => {
//   const { title, price, image, category, description } = req.body;
//   if (title && price && image && category && description) {
//     fs.readFile("./products.json", "utf8", (err, data) => {
//       const products = JSON.parse(data);
//       const newProduct = {
//         id: uuidv4(),
//         title: title,
//         price: price,
//         description: description,
//         category: category,
//         image: image,
//       };

//       products.push(newProduct);
//       fs.writeFile("./products.json", JSON.stringify(products), (err) => {});
//     });
//     res.send("The product was added successfully! ");
//   } else res.send("Missing product values");
// });

app.post("/products", (req, res) => {
  const { title, price, image, category, description } = req.body;
  if (title && price && image && category && description) {
    const product1 = new Producttt({
      title,
      price,
      image,
      category,
      description,
    });
    product1.save();
    res.send("The product was added successfully! ");
  } else res.send("Missing product values");
});

//update the product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, image, category, description } = req.body;
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === +id);
    if (product) {
      product.title = title ? title : product.title;
      product.price = price ? price : product.price;
      product.category = category ? category : product.category;
      product.description = description ? price : product.description;
      product.image = image ? image : product.image;
      fs.writeFile("./products.json", JSON.stringify(products), (err) => {
        res.send("The product has been updated");
      });
    } else {
      res.send("not found");
    }
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === +id);
    if (product) {
      products.splice(product, 1);
      fs.writeFile("./products.json", JSON.stringify(products), (err) => {});
      res.send("The product was deleted successfully!");
    } else {
      res.send("The product not found!");
    }
  });
});

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
