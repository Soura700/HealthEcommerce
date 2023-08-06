const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    town:{
        type:String,
        required:true
    },
    state:{
        type:String,
        // required:true
    },
    zip:{
        type:Number,
        required:true
    },
    user_detail:{
        type:Object,
    },
    landmark:{
        type:String,
    },

    
},{timestamps:true}
);

module.exports = mongoose.model("BillingDetails",CartSchema);