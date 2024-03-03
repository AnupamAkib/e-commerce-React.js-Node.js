const Product = require("../models/productModel");
const User = require("../models/userModel");

const createProduct = async(req, res) => {
    try{
        const _product = await Product.create(req.body);
        res.status(200).json({
            message : "success",
            product : _product
        });
    }
    catch(error){
        console.log("error creating product!");
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message : errors[0], errors }); //only send first error at once
    }
}

const getAllProducts = async(req, res) => {
    try{
        const _products = await Product.find({});
        console.log(`${_products.length} products fetched`);
        res.status(400).json({
            message : "success",
            products : _products
        });
    }
    catch(error){
        console.log("error fetching products!");
        res.status(400).json({
            message : "Error fetching product"
        });
    }
}

const giveUserFeedback = async(req, res) => {
    const productID = req.body.productID;
    const user = req.body.username; //will receive from jwt token
    const comment = req.body.comment;
    const rating = req.body.rating;

    console.log({productID, user, comment, rating});
 
    try{
        const isExistUser = await User.findOne({username: user});
        const isExistProduct = await Product.findOne({_id: productID});

        if(isExistUser && isExistProduct){
            //code to insert feedback;
            const userFeedback = {
                customerUsername: user,
                customerComment: comment,
                customerRating: rating
            }
            Product.findByIdAndUpdate(
                productID,
                {
                    $push: {customerFeedback: userFeedback}
                },
                {new : true}
            )
            .then(updatedProduct => {
                if(updatedProduct){ //product found & updated
                    res.status(200).json({message : "success", product : updatedProduct});
                }
                else{ //product not found
                    res.status(404).json({message : "Operation Unsuccessful"});
                }
            })
        }
        else{
            res.status(404).json({message : "Operation Unsuccessful"});
        }
    }
    catch(error){
        console.log("internal server error!");
        res.status(500).json({message : "Operation Unsuccessful"});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    giveUserFeedback
}