const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:true,
    },
    categories:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
    }, 
    countInStock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
      },
      offerPrice:{
        type:Number,
        default:0,

      },
},{timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);