const User = require("../models/userModel");

const createUser = async(req, res) => {
    try{
        const _user = await User.create(req.body);
        console.log("user successfully created!");
        console.log(req.body);
        res.status(200).json(_user);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message});
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