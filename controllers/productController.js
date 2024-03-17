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

const getSingleProduct = async(req, res) => {
    const productID = req.query.id;
    try{
        const _product = await Product.findOne({_id : productID}).populate('customerFeedback');
        if(_product != null){
            res.status(200).json({
                message : "success",
                product : _product
            });
        }
        else{
            res.status(404).json({
                message : "Product not found"
            });
        }
    }
    catch(error){
        res.status(400).json({
            message : "Bad request",
            error : error
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct
}