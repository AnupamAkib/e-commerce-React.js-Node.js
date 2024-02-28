const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const jwt_token_expires_in = "10h"; //10 hours

const createUser = async(req, res) => {
    try{
        const _user = await User.create(req.body);
        const token = jwt.sign({
            username : _user.username,
            fullName : _user.fullName,
            emailAddress : _user.emailAddress,
            id : _user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : jwt_token_expires_in
        });
        res.status(200).json({message : "success", accessToken : token, user : _user});
    }
    catch(error){
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message : errors[0], errors }); //only send first error at once
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).send({message : "Server Error"});
        }
    }
};

const login = async(req, res) => { //Login using username/email and password
    try{
        const username = req.body.username;
        const email = req.body.email;
        const password = md5(req.body.password);

        let existingUser = await User.findOne({ //login with username
            username, password
        });

        if(!existingUser){ //no user found for username
            existingUser = await User.findOne({ //login with email
                emailAddress : email, password
            });
        }

        if(existingUser){
            const token = jwt.sign({
                username : existingUser.username,
                fullName : existingUser.fullName,
                emailAddress : existingUser.emailAddress,
                id : existingUser._id
            }, process.env.JWT_SECRET_KEY, {
                expiresIn : jwt_token_expires_in
            });
            res.status(200).json({message : "success", accessToken : token});
        }
        else{
            res.status(400).json({message : "login failed!"});
        }
    }
    catch(error){
        res.status(400).json({message : "login failed!"});
    }
}

const getAllUsers = async(req, res) => {
    try{
        const _users = await User.find({});
        console.log(`${_users.length} user fetched`);

        console.table({
            username : req.username,
            fullName : req.fullName,
            emailAddress : req.emailAddress,
            mongoose_id : req.id
        });

        res.status(200).json({
            message : "success",
            users : _users
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
}

module.exports = {
    login,
    createUser,
    getAllUsers
}