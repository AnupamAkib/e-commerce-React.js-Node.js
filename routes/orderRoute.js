const express = require("express");
const route = express.Router();

const {placeOrder, getSingleOrderByID} = require("../controllers/orderController");

route.post("/placeOrder", placeOrder);
route.post("/getSingleOrderByID", getSingleOrderByID);

module.exports = route;
