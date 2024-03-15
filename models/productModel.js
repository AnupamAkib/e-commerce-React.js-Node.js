const mongoose = require("mongoose");
const {isLengthValid, capitalizeFirstLetter} = require("../validation/inputValidation");


const productSchema = mongoose.Schema(
    {
        productTitle : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: isLengthValid(0, 100), 
                    message: props => `Product title is too large.`
                }
            ]
        },
        productDescription : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator : isLengthValid(0, 500),
                    message: props => `Product Description is too large`
                }
            ]
        },
        productBrand : {
            type : String,
            default : "Unknown",
            trim : true,
            validate : [
                {
                    validator : isLengthValid(0, 50),
                    message: props => `Product Brand is too large`
                }
            ]
        },
        productPrice : {
            type : Number,
            required : true,
            trim : true
        },
        productPicture : {
            type : mongoose.Schema.Types.Mixed, //json file
            default : {
                URL : "#",
                name : ""
            }
        },
        productTags : {
            type : [String],
            required : true,
            default : [],
            trim : true,
        },
        deliveryFee : {
            type : Number,
            trim : true,
            default : 0
        },
        sellCount : {
            type : Number,
            default : 0
        },
        /*customerFeedback : { //it will be fetched from order //derived properties. need to go to pre middleware
            type : [{
                customerUsername : String,
                customerComment : String,
                customerRating : Number
            }],
            default : []
        },*/
        rating : { //it will derived from order schema //derived properties. need to go to pre middleware
            type : Number,
            default : 0
        }
    },
    {
        timestamps : true
    }
);

// Middleware to capitalize first character of productTitle
productSchema.pre('save', function(next) {
    this.productTitle = capitalizeFirstLetter(this.productTitle);
    next();
});

// Define a virtual property for customerFeedback
productSchema.virtual('customerFeedback').get(async function() {
    const Feedback = require("../models/feedbackModel");
    const _feedback = await Feedback.find({productID : this._id});
    return _feedback;
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;