const express = require("express");
const route = express.Router();

const {placeOrder, getSingleOrderByID, getOrdersByUser} = require("../controllers/orderController");

route.post("/placeOrder", placeOrder);
route.post("/getSingleOrderByID", getSingleOrderByID);
route.post("/getOrdersByUser", getOrdersByUser);

module.exports = route;
