const mongoose = require("mongoose");

const Product = require("../models/productModel");
const User = require("../models/userModel");

const orderSchema = mongoose.Schema(
    {
        productID : {
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        unitPrice : {
            type : Number
        },
        deliveryFee : {
            type : Number
        },
        deliveryAddress : {
            type : String
        },
        currentStatus : {
            type : String
        },
        orderPlacedAt : {
            type : String
        }
    },
    {
        timestamps : true
    }
);

orderSchema.pre('save', async function(next){
    const {getCurrentTimeDate} = require("../validation/commonMethods");
    if(this.isNew){
        this.orderPlacedAt = getCurrentTimeDate()
    }

    const product = await Product.findOne({_id : this.productID});
    this.unitPrice = product.productPrice; //get the unit price from product

    this.currentStatus = "Order Placed";

    this.deliveryFee = product.deliveryFee;

    next();
});

orderSchema.post('save', async function(doc, next){
    const user = await User.findOne({username : this.username});
    if(this.deliveryAddress == null || this.deliveryAddress == ""){
        this.deliveryAddress = user.shippingAddress;
    }
    next();
;});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;