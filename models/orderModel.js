const mongoose = require("mongoose");

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
        price : { //will be derived from product price
            type : Number
        },
        currentStatus : {
            type : String,
            default : "Order Placed" //maybe we can use 'enum' here
        },
        isFeedbackSubmitted : {
            type : Boolean,
            default : false
        },
        customerFeedback : {
            type : mongoose.Schema.Types.Mixed,
            default : {
                comment : "",
                rating : "",
                date : ""
            }
        },
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;