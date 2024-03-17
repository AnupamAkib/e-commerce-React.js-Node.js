const mongoose = require("mongoose");

const Product = require("../models/productModel");
const User = require("../models/userModel");

const orderSchema = mongoose.Schema(
    {
        productID : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: async function(v){
                        const _product = await Product.findOne({_id : v});
                        if(_product == null) return false;
                        else return true;
                    },
                    message: props => `product doesn't exist`
                }
            ]
        },
        username : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: async function(v){
                        const _user = await User.findOne({username : v});
                        if(_user == null) return false;
                        else return true;
                    },
                    message: props => `user doesn't exist`
                }
            ]
        },
        quantity : {
            type : Number,
            required : true,
            validate : [
                {
                    validator: function(v){
                        if(v < 1) return false;
                        else return true;
                    },
                    message: props => `quantity should be a positive number`
                }
            ]
        },
        unitPrice : {
            type : Number
        },
        deliveryFee : {
            type : Number
        },
        totalPrice : {
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

    this.totalPrice = (product.productPrice * this.quantity) + product.deliveryFee;

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