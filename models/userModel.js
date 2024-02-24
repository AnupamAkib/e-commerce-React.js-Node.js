const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        phoneNumber : {
            type : String,
            required : true
        },
        emailAddress : {
            type : String,
            required : true
        },
        shippingAddress : {
            type : String,
            required : false
        }
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
