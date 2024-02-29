const Product = require("../models/productModel");

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

module.exports = {
    createProduct,
    getAllProducts
}