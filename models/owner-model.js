const mongoose = require("mongoose");

//Owner Schema
const ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password: String,    
    prodcut:{
        type:Array,
        default:[]
    },
    contact:Number,
    gstin:String,
});

module.exports=mongoose.model("Owner",ownerSchema);