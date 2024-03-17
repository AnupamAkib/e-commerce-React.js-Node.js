const express = require("express");

const route = express.Router();

const {giveFeedback} = require("../controllers/feedbackController");

route.post("/submitFeedback", giveFeedback);

module.exports = route;