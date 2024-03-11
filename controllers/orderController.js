const Order = require("../models/orderModel");

const Product = require("../models/productModel");

const placeOrder = async(req, res) => {
    const productID = req.body.productID;
    const username = req.body.username;
    const quantity = req.body.quantity;
    const deliveryAddress = req.body.deliveryAddress;
    try{
        const _order = await Order.create({productID, username, quantity, deliveryAddress});
        console.log("order placed!!");
        res.status(200).json({
            message : "success",
            order : _order
        });
    }
    catch(error){
        console.log("order placed failed!!");
        res.status(400).json({
            message : "Order placement failed",
            error : error
        })
    }
}

module.exports = {
    placeOrder
}