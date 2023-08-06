const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    customername:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    
},{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);