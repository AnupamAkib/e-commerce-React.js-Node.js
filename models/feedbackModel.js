const mongoose = require("mongoose");
const {isLengthValid} = require("../validation/inputValidation");

const Order = require("../models/orderModel");

const feedbackSchema = mongoose.Schema(
    {
        orderID : {
            type : String,
            required : true,
            trim : true
        },
        productID : {
            type : String
        },
        username : {
            type : String
        },
        comment : {
            type : String,
            trim : true,
            validate : [
                {
                    validator : isLengthValid(0, 100),
                    message : props => `Comment is too large`
                }
            ]
        },
        rating : {
            type : Number,
            required : true,
            trim : true
        },
        dateTime : {
            type : String
        }
    }
);

feedbackSchema.pre('save', async function(next){
    const {getCurrentTimeDate} = require("../validation/commonMethods");
    this.dateTime = getCurrentTimeDate();
    
    const _order = await Order.findOne({_id : this.orderID});
    this.productID = _order.productID;
    this.username = _order.username;

    const existingFeedback = await Feedback.findOne({ //check if feedback already given for the orderID & user
        orderID: this.orderID,
        username: this.username
    });

    if(existingFeedback) {
        next("feedback already submitted");
    }
    else{
        next();
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
