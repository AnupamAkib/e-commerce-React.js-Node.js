const User = require("../models/userModel");

const createUser = async(req, res) => {
    try{
        const _user = await User.create(req.body);
        console.log("user successfully created!");
        console.log(req.body);
        res.status(200).json({message : "success", user : _user});
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

const getAllUser = async(req, res) => {
    try{
        const _users = await User.find({});
        console.log(`${_users.length} user fetched`);
        res.status(200).json(_users);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
}

module.exports = {
    createUser,
    getAllUser
}