const Feedback = require("../models/feedbackModel");

const giveFeedback = async (req, res) => {
    const orderID = req.body.orderID;
    const comment = req.body.comment;
    const rating = req.body.rating
    try{
        const _feedback = await Feedback.create({orderID, comment, rating});
        console.log("feedback submitted successfully");
        res.status(200).json({
            message : "success",
            feedback : _feedback
        });
    }
    catch(error){
        console.log("feedback submission failed");
        res.status(400).json({
            message : "feedback submission failed",
            error : error
        });
    }
}

module.exports = {
    giveFeedback
}