const express = require("express");
const route = express.Router();

const {placeOrder} = require("../controllers/orderController");

route.post("/placeOrder", placeOrder);

module.exports = route;
