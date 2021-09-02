const express = require("express");

const app = express();

const fs = require("fs");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const wixSchema = new mongoose.Schema({
  a: String,
  b: String,
  c: String,
  d: String,
  e: String,
  f: String,
  g: String,
  h: String,
  i: String,
  j: String,
  k: String,
  l: String,
});

const wix = mongoose.model("wix", wixSchema);
const Product = mongoose.model("Product", productSchema);
// Serve static files from the React app
app.use(express.static("client/build"));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Client");
});

app.get("/api/products", (req, res) => {
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
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id, (err, product) => {
    res.send(product);
  });
});

//post a new product
app.post("/api/products", (req, res) => {
  const { title, price, image, category, description } = req.body;
  if (title && price && image && category && description) {
    const product = new Product({ title, price, image, category, description });
    product.save((err, product) => {
      res.send(product);
    });
    // res.send("The product was added successfully! ");
  } else res.send("Missing product values");
});

//update the product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, image, category, description } = req.body;

  const updateFields = {};
  title ? (updateFields.title = title) : null;
  price ? (updateFields.price = price) : null;
  category ? (updateFields.category = category) : null;
  description ? (updateFields.description = description) : null;
  image ? (updateFields.image = image) : null;

  Product.findByIdAndUpdate(id, updateFields, { new: true }, (err, product) => {
    res.send(product);
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id, (err, product) => {
    res.send(product);
  });
});

app.post("/api/wix", (req, res) => {
  const a = req;
  console.log(req.params);
  console.log("hi");
  console.log(req.body);
  console.log("hii1");
  console.log(req);
  const wixi = new wix(a);
  wixi.save((err, wixi) => {
    res.send(wixi);
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
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

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT || 8080);
  }
);

// mongoose.connect(
//   "mongodb://localhost/gocode_shop",
//   { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
//   () => {
//     app.listen(8080);
//   }
// );
