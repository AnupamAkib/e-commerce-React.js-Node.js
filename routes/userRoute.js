const express = require("express");
const authGuard = require("../middlewares/authGuard");
const router = express.Router();

const {login, createUser, getAllUsers} = require("../controllers/userController");


router.post("/login", login);
router.post("/create", createUser);
router.get("/getAll", authGuard, getAllUsers); //protected route

module.exports = router;
