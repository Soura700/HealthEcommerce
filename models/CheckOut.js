const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    cardname:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    }, 
    cardnumber:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        require:true,

      },
      zipcode:{
        type:Number,
        require:true
      },
      cvv:{
        type:Number,
        require:true,
        unique:true
      },
       expmonth:{
        type:String,
        required:true
       } 
},{timestamps:true}
);

module.exports = mongoose.model("Product",ProductSchema);