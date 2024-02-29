const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
    {
        productTitle : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: function(v) {
                        if(v.length > 10) return false;
                    },
                    message: props => `Product title is too large.`
                }
            ]
        },
        productDescription : {
            type : String,
            required : true,
            trim : true,
        },
        productBrand : {
            type : String,
            default : "No Brand",
            trim : true,
        },
        productPrice : {
            type : Number,
            required : true,
            trim : true,
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
            default : [],
            required : true,
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
        customerFeedback : {
            type : [{
                customerName : String,
                customerComment : String,
                customerRating : Number
            }],
            default : []
        }
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;