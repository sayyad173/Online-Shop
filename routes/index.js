const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model")
const isLogined = require("../middlewares/isLogined");
const productModel = require("../models/product-model"); // ensure correct path




router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("index");

})
router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("shop", { error, loggedin: false });

})
router.get("/addtocard/:productid", isLogined, async function (req, res) {
    const email = req.user?.email;

    if (!email) {
        req.flash("error", "User not logged in properly.");
        return res.redirect("/login");
    }

    let user = await userModel.findOne({ email: email }); // ✅ field name fixed

    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/shop");
    }

    if (!user.cart) {
        user.cart = [];
    }

    user.cart.push(req.params.productid);
    await user.save();

    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/cart", isLogined, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");
const bill=  Number(user.cart[0].price)+20-Number(user.cart[0].discount);

    res.render("cart",{user,bill})
    
});



router.get("/shop", isLogined, async (req, res) => {
    try {
        let products = await productModel.find();
        let success = req.flash("success")

        res.render("shop", { products, success });
    } catch (err) {
        console.log(err);
        res.send("Error fetching products");
    }
});


router.get("/logout", isLogined, function (req, res) {
    res.render("shop")
})

module.exports = router;