const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model"); 

console.log("ENV =", process.env.NODE_ENV); // Check karne ke liye

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
       
        const owners = await ownerModel.find();
       
            if (owners.length > 0) {
                 res.status(502).send("You don't have permission to create new owner");
            }

            const { fullname, email, password } = req.body;

            const createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            res.status(201).send(createdOwner);
           });
}

router.get("/admin", (req, res) => {
  let success=  req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;
