const mongoose = require("mongoose");
const md5 = require("md5");
const {onlyAlphaLetters, onlyNumber, isLengthValid, isValidUsername, isValidPhoneNumber, isEmailValid} = require("../validation/inputValidation");

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    // Custom validator function to check if the string contains only letters (A-Z,a-z)
                    validator : onlyAlphaLetters,
                    message: "First name must contain only letters." //it will fire when validator function return false
                },
                {
                    validator: isLengthValid(0, 25),
                    message: props => `First name should be less than 25 characters.`
                }
            ]
        },
        lastName : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: onlyAlphaLetters,
                    message: "Last name must contain only letters."
                },
                {
                    validator: isLengthValid(0, 25),
                    message: props => `The last name is too large.`
                }
            ]
        },
        username : {
            type : String,
            unique : true,
            required : true,
            trim : true,
            validate: [
                {
                    validator: async function(v) { //username should be unique. check if already exist
                        const existingUser = await this.constructor.findOne({ username: v });
                        return !existingUser;
                    },
                    message: props => `The username is already in use. Please choose a different one.`
                },
                {
                    validator: isLengthValid(6, 20),
                    message: props => `The username must contain 6 to 20 characters.`
                },
                { 
                    validator: onlyNumber, //Custom validator function to check if the string contains only numbers
                    message: "Username is not valid."
                },
                { 
                    validator: isValidUsername, //Custom validator function to check if the string contains only numbers
                    message: "Username is not valid."
                }
            ]
        },
        password : {
            type : String,
            required : true,
            validate : [
                {
                    validator: isLengthValid(6, 20),
                    message: props => `The password must contain 6 to 20 characters.`
                }
            ]
        },
        profilePicture : {
            type : mongoose.Schema.Types.Mixed, //json file
            default : {
                URL : "#",
                name : ""
            }
        },
        phoneNumber : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: isValidPhoneNumber,
                    message: props => `Invalid Phone Number.`
                }
            ]
        },
        emailAddress : {
            type : String,
            unique : true,
            required : true,
            trim : true,
            validate: [
                {
                    validator: async function(v) { //email address should be unique. check if already exist
                        const existingEmail = await this.constructor.findOne({ emailAddress: v });
                        return !existingEmail;
                    },
                    message: props => `The email is already in use. Please choose a different one.`
                },
                {
                    validator: isLengthValid(0, 50),
                    message: props => `The email is too large.`
                },
                {
                    validator: isEmailValid,
                    message: props => `Invalid email address.`
                }
            ]
        },
        shippingAddress : {
            type : String,
            required : false,
            validate : [
                {
                    validator: isLengthValid(1, 200),
                    message: props => `The shipping address is too large.`
                }
            ]
        },
        wishList : {
            type : [String], //array
            default : [] //push product id
        }
    },
    {
        timestamps : true
    }
);

// Middleware to capitalize first character of firstName and lastName before saving and hash password
userSchema.pre('save', function(next) {
    this.firstName = capitalizeFirstLetter(this.firstName);
    this.lastName = capitalizeFirstLetter(this.lastName);
    this.password = md5(this.password);
    next();
});

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Define a virtual property for fullName
userSchema.virtual('fullName').get(function() {
    return this.firstName.trim() + " " + this.lastName.trim();
});

//enable virual property 
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
//enable unique index for unique value in schema
userSchema.index({ username: 1 }, { unique: true });


//export model
const User = mongoose.model("User", userSchema);
module.exports = User;
