const express = require("express");
const router = express.Router();
const {registerUser , loginUser, logout} = require("../controllers/authController");
// const cookieParser = require("cookie-parser");



router.get("/", (req, res) => {
    res.send("Hello Users");
})
router.post("/register",registerUser );
router.post("/login", loginUser );
router.get("/logout", logout );
module.exports = router;