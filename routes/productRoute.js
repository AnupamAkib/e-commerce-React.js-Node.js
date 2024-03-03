const express = require("express");
const authGuard = require("../middlewares/authGuard");
const router = express.Router();

const {createProduct, getAllProducts, giveUserFeedback} = require("../controllers/productController");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
router.post("/giveFeedback", giveUserFeedback);

module.exports = router;