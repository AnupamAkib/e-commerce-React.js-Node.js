const mongoose = require("mongoose");
const md5 = require("md5");

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: function(v) { // Custom validator function to check if the string contains only letters
                        for(let i=0; i<v.length; i++){
                            if(v[i] == ' ' || v[i] == '.') continue;
                            if(!((v[i]>='a' && v[i]<='z') || (v[i]>='A' && v[i]<='Z'))) return false;
                        }
                    },
                    message: "First name must contain only letters." //it will fire when validator function return false
                },
                {
                    validator: function(v) {
                        if(v.length > 25) return false;
                    },
                    message: props => `The first name is too large.`
                }
            ]
        },
        lastName : {
            type : String,
            required : true,
            trim : true,
            validate : [
                {
                    validator: function(v) { // Custom validator function to check if the string contains only letters
                        for(let i=0; i<v.length; i++){
                            if(v[i] == ' ' || v[i] == '.') continue;
                            if(!((v[i]>='a' && v[i]<='z') || (v[i]>='A' && v[i]<='Z'))) return false;
                        }
                    },
                    message: "Last name must contain only letters."
                },
                {
                    validator: function(v) {
                        if(v.length > 25) return false;
                    },
                    message: props => `The last name is too large.`
                }
            ]
        },
        username : {
            type : String,
            unique : true,
            required : true,
            trim : true,
            //minlength: 6,
            //maxlength: 25,
            validate: [
                {
                    validator: async function(v) { //check if already exist
                        const existingUser = await this.constructor.findOne({ username: v });
                        return !existingUser;
                    },
                    message: props => `The username is already in use. Please choose a different one.`
                },
                {
                    validator: function(v) { //check length of username
                        if(v.length < 6 || v.length > 20){
                            return false;
                        }
                    },
                    message: props => `The username must contain 6 to 20 characters.`
                },
                {
                    validator: function(v) { // Custom validator function to check if the string contains only numbers
                        for(let i=0; i<v.length; i++){
                            if((v[i]>='a' && v[i]<='z') || (v[i]>='A' && v[i]<='Z')) return true;
                        }
                        return false;
                    },
                    message: "Username must not contain only numbers."
                }
            ]
        },
        password : {
            type : String,
            required : true,
            validate : [
                {
                    validator: function(v) { //check length of username
                        if(v.length < 6 || v.length > 20){
                            return false;
                        }
                    },
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
                    validator: function(v) {
                        if(v.length != 11) return false;
                        if(!(v[0]=='0' && v[1]=='1')) return false;
                        for(let i=0; i<v.length; i++){
                            if(!(v[i]>='0' && v[i]<='9')){
                                return false;
                            }
                        }
                    },
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
                    validator: async function(v) {
                        const existingEmail = await this.constructor.findOne({ emailAddress: v });
                        return !existingEmail;
                    },
                    message: props => `The email is already in use. Please choose a different one.`
                },
                {
                    validator: function(v) {
                        if(v.length > 50) return false;
                    },
                    message: props => `The email is too large.`
                },
                {
                    validator: function(v) {
                        // Regular expression for email validation
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    },
                    message: props => `Invalid email address.`
                }
            ]
        },
        shippingAddress : {
            type : String,
            required : false,
            validate : [
                {
                    validator: function(v) {
                        if(v.length > 150) return false;
                    },
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
