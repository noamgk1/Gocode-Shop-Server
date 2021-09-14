const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  getByQuery,
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", getByQuery);
router.get("/:id", getProduct);
router.post("/", checkAuth, postProduct);
router.put("/:id", checkAuth, updateProduct);
router.delete("/:id", checkAuth, deleteProduct);

module.exports = router;
