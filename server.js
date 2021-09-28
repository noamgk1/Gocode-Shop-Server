const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

console.log(express);

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT || 8080);
  }
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

const ordersRoutes = require("./api/routes/orders");
const productsRoutes = require("./api/routes/products");
const usersRoutes = require("./api/routes/users");
const categoriesRoutes = require("./api/routes/categories");

app.use(morgan("dev")); //consolelog to server
//app.use('/uploads', express.static('uploads'));
app.use(express.static("client/build"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);

const wixSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String },
  phone: { type: String },
  lname: {
    type: String,
  },
  fname: { type: String },
  url: { type: String },
  price: { type: Number },
  image: { type: String },
  pname: { type: String },
  date: { type: Date, default: Date.now },
});

const Wix = mongoose.model("Wix", wixSchema);

app.post("/api/wix", (req, res) => {
  const { pname, image, price, id, phone, lname, fname, url } = req.body;
  console.log(req.body);
  console.log("111111111111", req);
  const wixi = new Wix({
    _id: new mongoose.Types.ObjectId(),
    pname,
    image,
    price,
    id,
    phone,
    lname,
    fname,
    url,
  });
  wixi.save();

  res.send(wixi);
  console.log(wixi);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
