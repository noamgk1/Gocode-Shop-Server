const mongoose = require("mongoose");
const Category = require("../models/category");

module.exports = {
  getAllCategories: (req, res) => {
    Category.find()
      .then((categories) => {
        res.status(200);
        res.send(categories);
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createCategory: (req, res) => {
    const { name, image } = req.body;

    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name,
      image,
    });

    category.save();
    res.send(category);
  },
  getCategory: (req, res) => {
    const categoryId = req.params.id;

    Category.findById(categoryId)
      .then((category) => {
        res.status(200).json({
          category,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateCategory: (req, res) => {
    const categoryId = req.params.id;

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category not found",
          });
        }
      })
      .then(() => {
        Category.updateOne({ _id: categoryId }, req.body)
          .then(() => {
            res.status(200).json({
              message: "Category Updated",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
  deleteCategory: (req, res) => {
    const categoryId = req.params.id;

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category not found",
          });
        }
      })
      .then(() => {
        Category.deleteOne({ _id: categoryId })
          .then(() => {
            res.status(200).json({
              message: `Category _id:${categoryId} Deleted`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
};
