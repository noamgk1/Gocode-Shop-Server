const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  getAllOrders,
  postOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersUser,
} = require("../controllers/orders");

router.get("/", checkAuth, getAllOrders);
router.post("/user", checkAuth, getAllOrdersUser);
router.post("/", checkAuth, postOrder);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", checkAuth, deleteOrder);

module.exports = router;
