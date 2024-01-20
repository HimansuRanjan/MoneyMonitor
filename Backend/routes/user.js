const express = require("express");
const {
    register,
    login,
    logout,
} = require("../controllers/user");

// const { isAuthnticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);


module.exports = router;
