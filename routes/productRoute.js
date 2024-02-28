const express = require("express");
const authGuard = require("../middlewares/authGuard");
const router = express.Router();

const {createProduct, getAllProducts} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);

module.exports = router;