const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");

module.exports = {
  getByQuery: (req, res) => {
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
          products = products.filter((p) => p.category == category);
        }

        if (title) {
          products = products.filter((p) =>
            p.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        if (products) {
          res.send(products);
        } else {
          res.send("There are no matching products!");
        }
      }
    );
  },

  getProduct: (req, res) => {
    const { id } = req.params;
    Product.findById(id)
      .then((product) => {
        res.send(product);
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  postProduct: (req, res) => {
    const { title, price, image, category, description } = req.body;
    if (title && price && image && category && description) {
      Category.findById(category)
        .then((category1) => {
          if (!category1) {
            return res.status(404).json({
              message: "Category not found",
            });
          }

          const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            title,
            price,
            image,
            category,
            description,
          });
          product.save();
          res.send(product);
        })

        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    }
  },

  updateProduct: (req, res) => {
    const { id } = req.params;
    const { title, price, image, category, description } = req.body;
    const updateFields = {};
    title ? (updateFields.title = title) : null;
    price ? (updateFields.price = price) : null;
    category ? (updateFields.category = category) : null;
    description ? (updateFields.description = description) : null;
    image ? (updateFields.image = image) : null;

    Product.findByIdAndUpdate(
      id,
      updateFields,
      { new: true },
      (err, product) => {
        res.send(product);
      }
    );
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;
    Product.findByIdAndDelete(id, (err, product) => {
      res.send(product);
    }).catch((error) => {
      res.status(500).json({
        error,
      });
    });
  },
};
