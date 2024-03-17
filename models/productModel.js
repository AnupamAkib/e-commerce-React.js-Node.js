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

productSchema.virtual('customerFeedback', {
    ref: 'Feedback', // Reference to the Feedback model
    localField: '_id', // Field from this model
    foreignField: 'productID', // Field from the referenced model
    justOne: false // Set to false if you expect multiple feedback per product
});

productSchema.virtual('averageRating').get(function() {
    try{
        const customerFeedback = this.customerFeedback;
        if (!customerFeedback || !customerFeedback.length) {
            return "0"; // Return 0 if no feedback found
        }
        let sum = 0, len = customerFeedback.length;
        for(let i=0; i<len; i++){
            sum += customerFeedback[i].rating;
        }
        let avg = sum/len;
        console.log("avg = " + avg);
        return avg.toFixed(2);
    }
    catch(error){
        console.error("Error fetching feedback:", error);
        return [];
    }
});

//enable virual property 
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;