const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

router.get("/", getAllCategories);
router.post("/", checkAuth, createCategory);
router.get("/:id", getCategory);
router.put("/:id", checkAuth, updateCategory);
router.delete("/:id", checkAuth, deleteCategory);

module.exports = router;
