const userModel = require("../models/user-model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const productModel = require("../models/product-model");


// userRegister Route
module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You Aleady Have Account,please login ")

        bcrypt.genSalt(10, function (err, salt) {

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User Created Successfully....");
                }
            });
        });

    } catch (err) {
        console.log(err.message);

    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("email or password incorrect");

    bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);

            // 👇 Fetch products
            try {
                let products = await productModel.find();
                res.render("shop", { products }); // ✅ Fix here
            } catch (err) {
                console.log(err);
                res.send("Something went wrong while loading products");
            }

        } else {
            return res.send("email or password incorrect");
        }
    });
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
}