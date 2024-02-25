const express = require("express");
const router = express.Router();

const {login, createUser, getAllUser} = require("../controllers/userController");


router.post("/login", login);
router.post("/create", createUser);
router.get("/getAll", getAllUser);

module.exports = router;
