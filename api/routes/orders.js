const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

router.get("/", checkAuth, getAllOrders);
router.post("/", checkAuth, createOrder);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", checkAuth, deleteOrder);

module.exports = router;
