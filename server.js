const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
// Serve static files from the React app
app.use(express.static("client/build"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Client");
});
//get products by query
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
//delete product by ip
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id, (err, product) => {
    res.send(product);
  });
});

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, admin: user.admin }, "mySecretKey", {
    expiresIn: "5s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, admin: user.admin }, "myRefreshSecretKey");
};

// get one user
app.post("/api/signIn", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email, password: password }, (err, user) => {
    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.json({
        email: user.email,
        admin: user.admin,
        accessToken,
        refreshToken,
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Email or Password is wrong" });
    }
  });
});

//post a new user
app.post("/api/signUp", (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  if (email && firstName && lastName && password) {
    const user = new User({ firstName, lastName, password, email });
    user.save((err, user) => {
      res.status(200).json({
        status: 200,
        data: user,
        message: "Succesfully create new user",
      });
    });
  } else {
    return res.status(400).json({ status: 400, message: e.message });
  }
});

const verify = (req, res, next) => {
  const authHeader = req.authHeader.authorization;
  if (authHeader) {
    const token = authHeader.split("")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(401).json("token not good!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you have no acsess!");
  }
};

// app.delete("/api/users/:userId", verify, (req, res) => {
//   if (req.user.id === req.params.userId || req.user.isAdmin) {
//     res.status(200).json("User has been deleted.");
//   } else {
//     res.status(403).json("You are not allowed to delete this user!");
//   }
// });

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
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
