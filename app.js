const express = require("express");
const app = express();
const db = require("./config/mongoose-connection")

const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require('express-session')
const flash = require("connect-flash");

const ownersRouter =  require("./routes/ownersRouter");
const productRouters =  require("./routes/productRouters");
const usersRouter =  require("./routes/usersRouter");
const indexRouter =  require("./routes/index");
const Product = require("./models/product-model")
require("dotenv").config();

app.use(
    expressSession({
        resave:false,
           saveUninitialized: true,
        secret:process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");   


app.use("/owners",ownersRouter);
app.use("/products",productRouters);
app.use("/users",usersRouter);
app.use("/",indexRouter);


app.listen(3000,()=>{
    console.log("Server Running......");
    })
