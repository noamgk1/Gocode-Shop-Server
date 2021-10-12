const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

module.exports = {
  getAllOrders: (req, res) => {
    Order.find()
      .populate("products.id")
      // .populate("userID")
      .exec()
      .then((order) => {
        res.status(200);
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getAllOrdersUser: (req, res) => {
    const { id } = req.body;
    User.findById(id)
      .then((a) => {
        if (!a) {
          return res.status(404).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });

    Order.find({ userID: id })
      .populate("products.id")
      // .populate("userID")
      .exec()
      .then((order) => {
        res.status(200);
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  postOrder: (req, res) => {
    const { user, cartList, itemsPrice, userDetail } = req.body;
    User.findById(user.id)
      .then((a) => {
        if (!a) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          userID: user.id,
          products: cartList,
          userDetail,
          totalAmount: itemsPrice,
        });

        order.save();
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getOrder: (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
      .populate("User")
      // .populate("productid")
      .then((order) => {
        res.status(200).json({
          order,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateOrder: (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).json({
            message: "order not found",
          });
        }
      })
      .then(() => {
        Order.updateOne({ _id: orderId }, req.body)
          .then(() => {
            res.status(200).json({
              message: "order Updated",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
  deleteOrder: (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).json({
            message: "order not found",
          });
        }
      })
      .then(() => {
        Order.deleteOne({ _id: orderId })
          .then(() => {
            res.status(200).json({
              message: `order _id:${orderId} Deleted`,
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
