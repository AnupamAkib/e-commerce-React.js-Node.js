const express = require("express");
const router = express.Router();

const {createUser, getAllUser} = require("../controllers/userController");


router.post("/create", createUser);
router.get("/getAll", getAllUser);

module.exports = router;
