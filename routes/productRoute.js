const express = require("express");
const authGuard = require("../middlewares/authGuard");
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/create", productController.createProduct);
router.get("/getAll", productController.getAllProducts);
router.get("/view", productController.getSingleProduct);


module.exports = router;